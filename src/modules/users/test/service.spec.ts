import { Test } from '@nestjs/testing';
import { UsersService } from '../users.service';
import getRepositoryMock from '../../../mocks/repositoryMock';
import usersMock from '../../../mocks/usersMock';

const repositoryMock = getRepositoryMock(usersMock);

describe('User AuthService', () => {
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

  it('should return users by name', async () => {
    const userResult = await userService.getByUsersName('name');
    expect(userResult).toBe(usersMock);
  });

  it('should create users', async () => {
    const createdUser = await userService.create(usersMock[0]);
    expect(createdUser).toBe(usersMock[0]);
  });

  it('should get only admins', async () => {
    const admins = await userService.getUsersByType('admin');
    expect(admins).toBe(usersMock);
  });

  it('should get only users', async () => {
    const users = await userService.getUsersByType('user');
    expect(users).toBe(usersMock);
  });
});
