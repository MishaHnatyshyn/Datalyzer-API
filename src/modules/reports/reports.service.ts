import { Injectable } from '@nestjs/common';
import { ConnectionManagerService } from '../connections/connection-manager.service';
import { ModelsService } from '../models/models.service';

@Injectable()
export class ReportsService {
  constructor(
    private modelsService: ModelsService,
    private connectionManager: ConnectionManagerService,
  ) {}

  async getFieldValues(data: number[]) {
    const fields = await this.modelsService.getModelItemsFieldsData(data);
    const [firstItem, secondItem] = fields;
    const connectionId = await this.modelsService.getConnectionIdByModelItemFieldId(firstItem.id);
    const connection = await this.connectionManager.getConnection(connectionId);
    const queryBuilder = connection.createQueryBuilder();
    if (firstItem.model_item.id === secondItem.model_item.id) {
      queryBuilder
        .select(fields.map(_ => _.original_name))
        .from(firstItem.model_item.table_name, 'table');
    } else {
      const {
        first_model_item_relation_field: firstTableRelField,
        second_model_item_relation_field: secondTableRelField,
        first_model_item_id: firstModelItemRelId,
        second_model_item_id: secondModelItemRelId,
      } = await this.modelsService.getRelationData(firstItem.model_item.id, secondItem.model_item.id);

      const {
        original_name: fName,
        model_item: { table_name: fTable},
      } = firstModelItemRelId === firstItem.model_item.id ? firstItem : secondItem;

      const {
        original_name: sName,
        model_item: { table_name: sTable},
      } = secondModelItemRelId === secondItem.model_item.id ? secondItem : firstItem;

      queryBuilder
        .select([
          `"table".${fName} as ${fName}`,
          `"secondTable".${sName} as ${sName}`,
        ])
        .from(fTable, 'table')
        .innerJoin(
          sTable,
          'secondTable',
          `"table".${firstTableRelField} = "secondTable".${secondTableRelField}`,
        );
    }
    return queryBuilder.getRawMany();
  }
}
