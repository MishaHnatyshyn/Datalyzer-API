import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import userProviders from './providers';
import { UsersService } from './service';
import { UsersController } from './controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    ...userProviders,
    UsersService,
  ],
})

export default class UserModule {}
