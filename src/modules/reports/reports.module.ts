import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { ConnectionsModule } from '../connections/connections.module';
import { ModelsModule } from '../models/models.module';
import { ReportsRepositoryService } from './reports-repository.service';
import reportsProviders from './reports.providers';
import DatabaseModule from '../database';

@Module({
  imports: [DatabaseModule, ConnectionsModule, ModelsModule],
  controllers: [ReportsController],
  providers: [
    ...reportsProviders,
    ReportsRepositoryService,
    ReportsService,
  ],
})
export class ReportsModule {}
