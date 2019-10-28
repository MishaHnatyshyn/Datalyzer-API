import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

import DatabaseModule from './modules/database';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule],
})

export class AppModule {}
