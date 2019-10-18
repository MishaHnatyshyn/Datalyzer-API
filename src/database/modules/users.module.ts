import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { userProviders } from '../providers/user.providers';
import { UsersService } from '../services/users.service';
import { UsersController } from '../../controllers/user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    ...userProviders,
    UsersService,
  ],
})
export class UsersModule {}
