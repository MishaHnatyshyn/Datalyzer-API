import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

import DatabaseModule from './modules/database';
import { ConnectionsModule } from './modules/connections/connections.module';
import { ModelsModule } from './modules/models/models.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, ConnectionsModule, ModelsModule, DashboardModule],
})

export class AppModule {}
