import { Injectable } from '@nestjs/common';
import { ConnectionManagerService } from '../connections/connection-manager.service';
import { ModelsService } from '../models/models.service';
import { ReportsRepositoryService } from './reports-repository.service';
import { UpdateReportDto } from './dto/updateReport.dto';
import { CreateReportDto } from './dto/createReport.dto';
import { EntityManager, getManager } from 'typeorm';

@Injectable()
export class ReportsService {
  constructor(
    private modelsService: ModelsService,
    private connectionManager: ConnectionManagerService,
    private reportsRepositoryService: ReportsRepositoryService,
  ) {}

  async getFieldValues(data: number[]) {
    const fields = await this.modelsService.getModelItemsFieldsData(data);
    const [firstItem, secondItem] = fields;
    const connectionId = await this.modelsService.getConnectionIdByModelItemFieldId(firstItem.id);
    const connection = await this.connectionManager.getConnection(connectionId);
    const queryBuilder = connection.createQueryBuilder();
    if (firstItem.model_item.id === secondItem.model_item.id) {
      queryBuilder.select(fields.map(_ => _.original_name)).from(firstItem.model_item.table_name, 'table');
    } else {
      const {
        first_model_item_relation_field: firstTableRelField,
        second_model_item_relation_field: secondTableRelField,
        first_model_item_id: firstModelItemRelId,
        second_model_item_id: secondModelItemRelId,
      } = await this.modelsService.getRelationData(firstItem.model_item.id, secondItem.model_item.id);

      const {
        original_name: fName,
        model_item: { table_name: fTable },
      } = firstModelItemRelId === firstItem.model_item.id ? firstItem : secondItem;

      const {
        original_name: sName,
        model_item: { table_name: sTable },
      } = secondModelItemRelId === secondItem.model_item.id ? secondItem : firstItem;

      queryBuilder
        .select([`"table".${fName} as ${fName}`, `"secondTable".${sName} as ${sName}`])
        .from(fTable, 'table')
        .innerJoin(sTable, 'secondTable', `"table".${firstTableRelField} = "secondTable".${secondTableRelField}`);
    }
    return queryBuilder.getRawMany();
  }

  deleteReport(report: number, user: number) {
    return this.reportsRepositoryService.delete({ id: report, user_id: user });
  }

  async updateReportData(report: number, data: UpdateReportDto, user: number) {
    await this.reportsRepositoryService.update({ id: report, user_id: user }, data);
    return this.reportsRepositoryService.findOne({ id: report, user_id: user });
  }

  async createReport(data: CreateReportDto, user: number) {
    return getManager().transaction(async manager => {
      const report = await this.reportsRepositoryService.createReport({ ...data, user, manager });
      const reportItems = await Promise.all(
        data.modelItems.map((modelItemField) => (
          this.reportsRepositoryService.createReportItem({ modelItemField, report: report.id, manager })),
        ),
      );
      return {
        ...report,
        report_items: reportItems,
      };
    });
  }
}