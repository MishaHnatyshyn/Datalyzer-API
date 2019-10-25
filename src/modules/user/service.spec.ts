import { Test } from '@nestjs/testing';
import { UsersService } from './service';
import getRepositoryMock from '../../mocks/repositoryMock';
import usersMock from '../../mocks/usersMock';

interface Params {
  where: object;
}

const repositoryMock = getRepositoryMock(usersMock);

describe('User Service', () => {
  let userService: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: 'USER_REPOSITORY',
          useClass: repositoryMock,
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
    expect(userResult).toBe(usersMock);
  });

  it('should create user', async () => {
    const createdUser = await userService.create(usersMock[0]);
    expect(createdUser).toBe(usersMock[0]);
  });

  it('should get only admins', async () => {
    const admins = await userService.getAdmins();
    expect(admins).toBe(usersMock);
  });
});
