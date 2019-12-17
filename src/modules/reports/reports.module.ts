import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { ConnectionsModule } from '../connections/connections.module';
import { ModelsModule } from '../models/models.module';

@Module({
  imports: [ConnectionsModule, ModelsModule],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {}
