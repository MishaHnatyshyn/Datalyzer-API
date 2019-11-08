import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

import DatabaseModule from './modules/database';
import { ConnectionsModule } from './modules/connections/connections.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, ConnectionsModule],
})

export class AppModule {}
