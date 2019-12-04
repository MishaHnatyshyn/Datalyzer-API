import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateConnectionDto} from './dto/createConnection.dto';
import Connection from '../database/entities/connection.entity';
import {ConnectionsRepositoryService} from './connections-repository.service';
import {ConnectionTypeRepositoryService} from './connection-type-repository.service';
import {ConnectionManagerService} from './connection-manager.service';
import {
  ConnectionErrorMessage,
  FormattedRelationQueryResult,
  FormattedTableAndColumnQueryResult,
  RelationsQueryResult,
  TableAndColumnQueryResult,
} from './connections.interfaces';
import { formatRelationsResponse, formatTablesAndColumnsResponse } from './utils';
import queries from '../database/queries';

@Injectable()
export class ConnectionsService {
  constructor(
    private connectionManager: ConnectionManagerService,
    private connectionRepository: ConnectionsRepositoryService,
    private connectionTypeRepository: ConnectionTypeRepositoryService,
  ) {}

  async createNewConnection(data: CreateConnectionDto, admin: number): Promise<Connection> {
    const connectionWithSameName = await this.connectionRepository.getByConnectionName(data.name);
    if (connectionWithSameName) {
      throw new HttpException({
        error: ConnectionErrorMessage.NAME_IS_NOT_UNIQ,
      }, HttpStatus.BAD_REQUEST);
    }

    const connectionTypeName = await this.connectionTypeRepository.getConnectionTypeName(data.typeId);
    if (!connectionTypeName) {
      throw new HttpException({
        error: ConnectionErrorMessage.DATABASE_TYPE_DOES_NOT_EXISTS,
      }, HttpStatus.BAD_REQUEST);
    }

    const isDatabaseReachable = await ConnectionManagerService.isReachable({
      name: data.name,
      database: data.databaseName,
      port: data.port,
      host: data.host,
      username: data.username,
      password: data.password,
      type: connectionTypeName,
    });

    if (!isDatabaseReachable) {
      throw new HttpException({
        error: ConnectionErrorMessage.CANNOT_ESTABLISH_CONNECTION,
      }, HttpStatus.BAD_REQUEST);
    }

    return this.connectionRepository.create({ ...data, adminId: admin});
  }

  getConnectionsList(page: number, itemsPerPage: number, search: string, admin: number) {
    const skip = (page - 1) * itemsPerPage;
    return this.connectionRepository.getConnectionList(skip, itemsPerPage, search, admin);
  }

  async getConnectionTables(id: number): Promise<FormattedTableAndColumnQueryResult[]> {
    const result = await this.execRawQuery<TableAndColumnQueryResult[]>(id, queries.dataBaseSelectTablesAndColumnsQuery);
    return formatTablesAndColumnsResponse(result);
  }

  async getConnectionRelations(id: number): Promise<FormattedRelationQueryResult[]> {
    const result = await this.execRawQuery<RelationsQueryResult[]>(id, queries.dataBaseRelationsQuery);
    return formatRelationsResponse(result);
  }

  async getConnectionsCount(admin: number) {
    const count = await this.connectionRepository.getCount({ admin_id: admin });
    return { count };
  }

  async isReachable(id: number) {
    const connection = await this.connectionManager.getConnection(id);
    if (!connection) {
      throw new HttpException({
        error: ConnectionErrorMessage.CANNOT_ESTABLISH_CONNECTION,
      },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  private async execRawQuery<T>(id: number, query: object): Promise<T> {
    const [ connection, connectionDescription ] = await Promise.all([
      this.connectionManager.getConnection(id),
      this.connectionRepository.getDataForConnectionCreating(id),
    ]);
    if (!connection || !connectionDescription) {
      throw new HttpException({
        error: ConnectionErrorMessage.CONNECTION_DOES_NOT_EXISTS,
      }, HttpStatus.BAD_REQUEST);
    }
    const rawQuery = query[connectionDescription.type];
    return connection.query(rawQuery);
  }
}
