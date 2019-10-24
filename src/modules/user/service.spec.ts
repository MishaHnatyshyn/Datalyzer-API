import { Test } from '@nestjs/testing';
import { UsersService } from './service';
import { BaseEntity } from 'typeorm';
import User from '../../database/entities/user.entity';

interface Params {
  where: object;
}

const userMock = new User();
userMock.id = 1;
userMock.name = 'misha';
userMock.password = '123321';
userMock.user_type_id = 1;
userMock.created_by_id = 0;

const inject = (entityMock) => (taraget: any) => {
  class NewConstructor {
    constructor() {
      return new taraget(entityMock);
    }
  }

  return NewConstructor as any;
};

@inject(userMock)
// tslint:disable-next-line:max-classes-per-file
class RepositoryApi {
  constructor(public entityMock?: BaseEntity) {}

  find(params: BaseEntity): Promise<BaseEntity[]> {
    return Promise.resolve([this.entityMock]);
  }

  create(entity: BaseEntity): Promise<BaseEntity> {
    return Promise.resolve(userMock);
  }
}

describe('User Service', () => {
  let userService: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: 'USER_REPOSITORY',
          useClass: RepositoryApi,
        },
        UsersService,
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should return user by name', async () => {
    const userResult = await userService.getByUsersName('misha');
    expect(userResult).toContain(userMock);
  });

  it('should create user', async () => {
    const createdUser = await userService.create(userMock);
    expect(createdUser).toBe(userMock);
  });
});
