import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../../app.controller';
import { AppService } from '../../app.service';
import User from '../../database/entities/user.entity';
import { DatabaseModule } from '../../database/database.module';
import { UsersService } from './service';
import CreateDto from './dto/create.dto';
import { UsersController } from './controller';
import userProviders from './providers';

describe('AppController', () => {
  let userController: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [UsersController],
      providers: [
        ...userProviders,
        UsersService,
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    userController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create user record"', async () => {
    const mock = new CreateDto();
    mock.name = 'Misha';
    mock.password = '123321';
    // mock.user_type_id = 1;
    await userService.create(mock);
  });
});
