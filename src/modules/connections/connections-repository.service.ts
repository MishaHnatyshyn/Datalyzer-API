import {Inject, Injectable} from '@nestjs/common';
import {CONNECTION_REPOSITORY} from '../../constants';
import {Repository} from 'typeorm';
import Connection from '../database/entities/connection.entity';
import {ConnectionData, DatabaseType} from './connections.interfaces';

@Injectable()
export class ConnectionsRepositoryService {
  constructor(
    @Inject(CONNECTION_REPOSITORY)
    private readonly connectionRepository: Repository<Connection>,
  ) {}

  create({ typeId, host, port, username, password, name, adminId, databaseName }) {
    const connection = new Connection();
    connection.admin_id = adminId;
    connection.type_id = typeId;
    connection.host = host;
    connection.port = port;
    connection.username = username;
    connection.password = password;
    connection.db_name = databaseName;
    connection.name = name;
    return this.connectionRepository.save(connection);
  }

  getById(id: number): Promise<Connection> {
    return this.connectionRepository.findOne(id);
  }

  async getDataForConnectionCreating(id: number): Promise<ConnectionData> {
    const connection = await this.connectionRepository.findOne(id, {
      relations: ['type'],
    });
    if (!connection) {
      return null;
    }
    const { host, port, username, type: { name: typeName }, db_name, password, name } = connection;
    return { host, port, username, type: typeName as DatabaseType , database: db_name, password, name };
  }

  getByConnectionName(name: string): Promise<Connection> {
    return this.connectionRepository.findOne({ name });
  }

  getConnectionList(skip: number, itemsPerPage: number, admin: number): Promise<Connection[]> {
    return this.connectionRepository
      .createQueryBuilder('connection')
      .where('connection.admin_id = :admin', {admin})
      .skip(skip)
      .take(itemsPerPage)
      .getMany();
  }
}