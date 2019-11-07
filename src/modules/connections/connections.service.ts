import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateConnectionDto} from './dto/createConnection.dto';
import Connection from '../database/entities/connection.entity';
import {ConnectionsRepositoryService} from './connections-repository.service';
import {ConnectionTypeRepositoryService} from './connection-type-repository.service';
import {ConnectionManagerService} from './connection-manager.service';
import {CreateConnectionErrorMessage} from "./connections.interfaces";

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
        status: HttpStatus.BAD_REQUEST,
        error: CreateConnectionErrorMessage.NAME_IS_NOT_UNIQ,
      }, 400);
    }

    const connectionTypeName = await this.connectionTypeRepository.getConnectionTypeName(data.typeId);
    if (!connectionTypeName) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: CreateConnectionErrorMessage.DATABASE_TYPE_DOES_NOT_EXISTS,
      }, 400);
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
        status: HttpStatus.BAD_REQUEST,
        error: CreateConnectionErrorMessage.CANNOT_ESTABLISH_CONNECTION,
      }, 400);
    }

    return this.connectionRepository.create({ ...data, adminId: admin});
  }

  getConnectionsList(page: number, itemsPerPage: number, admin: number) {
    const skip = (page - 1) * itemsPerPage;
    return this.connectionRepository.getConnectionList(skip, itemsPerPage, admin);
  }

}
