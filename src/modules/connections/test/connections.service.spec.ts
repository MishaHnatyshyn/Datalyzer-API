import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionsService } from '../connections.service';
import { ConnectionManagerService } from '../connection-manager.service';
import { ConnectionsRepositoryService } from '../connections-repository.service';
import { ConnectionTypeRepositoryService } from '../connection-type-repository.service';
import { CreateConnectionDto } from '../dto/createConnection.dto';
import {CreateConnectionErrorMessage} from "../connections.interfaces";

jest.mock('../connection-manager.service')

describe('ConnectionsService', () => {
  let service: ConnectionsService;
  const mockAdminId = 1;
  const mockRequestData: CreateConnectionDto = {
    name: 'name',
    port: '0000',
    host: 'host',
    databaseName: 'databaseName',
    password: 'password',
    username: 'username',
    typeId: 1,
  };
  const connectionManagerMock = {};
  let connectionRepositoryMock = {
    getByConnectionName: jest.fn(),
    create: jest.fn(),
    getConnectionList: jest.fn(),
  };
  let connectionTypeRepositoryMock = {
    getConnectionTypeName: jest.fn(),
  };
  beforeEach(async () => {
    ConnectionManagerService.isReachable = jest.fn().mockReturnValue(true);
    connectionRepositoryMock = {
      getByConnectionName: jest.fn().mockReturnValue(null),
      create: jest.fn(),
      getConnectionList: jest.fn(),
    };
    connectionTypeRepositoryMock = {
      getConnectionTypeName: jest.fn().mockReturnValue(true),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: ConnectionManagerService, useValue: connectionManagerMock },
        { provide: ConnectionsRepositoryService, useValue: connectionRepositoryMock },
        { provide: ConnectionTypeRepositoryService, useValue: connectionTypeRepositoryMock },
        ConnectionsService,
      ],
    }).compile();

    service = module.get<ConnectionsService>(ConnectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getConnectionsList', () => {
    it('should calculate proper skip value and send it to ConnectionRepositoryServer', () => {
      const skip = 10;
      service.getConnectionsList(2, 10, mockAdminId);
      expect(connectionRepositoryMock.getConnectionList).toBeCalledWith(skip, 10, mockAdminId)
    })
  });

  describe('createNewConnection', () => {
    it('should return proper error if connection name already exists', async () => {
      connectionRepositoryMock.getByConnectionName = jest.fn().mockReturnValue(true);
      try {
        await service.createNewConnection(mockRequestData, mockAdminId)
      } catch (e) {
        expect(e.message.error).toBe(CreateConnectionErrorMessage.NAME_IS_NOT_UNIQ)
      }
    });

    it('should return proper error if connection type doesn\'t exists', async () => {
      connectionTypeRepositoryMock.getConnectionTypeName = jest.fn().mockReturnValue(false);
      try {
        await service.createNewConnection(mockRequestData, mockAdminId)
      } catch (e) {
        expect(e.message.error).toBe(CreateConnectionErrorMessage.DATABASE_TYPE_DOES_NOT_EXISTS)
      }
    });

    it('should return proper error if connection can\'t be established', async () => {
      ConnectionManagerService.isReachable = jest.fn().mockReturnValue(false);
      try {
        await service.createNewConnection(mockRequestData, mockAdminId)
      } catch (e) {
        expect(e.message.error).toBe(CreateConnectionErrorMessage.CANNOT_ESTABLISH_CONNECTION)
      }
    });

    it('should return create connection entity if all the data is correct', async () => {
      const mockConnectionEntity = {};
      connectionRepositoryMock.create = jest.fn().mockReturnValue(mockConnectionEntity);
      const connection = await service.createNewConnection(mockRequestData, mockAdminId);
      expect(connection).toBe(mockConnectionEntity)
    });

  });
});
