import { Module } from '@nestjs/common';
import DatabaseModule from '../database';
import userProviders from './users.providers';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    ...userProviders,
    UsersService,
  ],
  exports: [UsersService],
})

export class UsersModule {}
