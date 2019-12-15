import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ModelsRepositoryService } from './models-repository.service';
import { ModelItemsRepositoryService } from './model-items-repository.service';
import { ModelItemsFieldRepositoryService } from './model-items-field-repository.service';
import { ModelItemsRelationRepositoryService } from './model-items-relation-repository.service';
import { GetModelFieldValuesDto } from './dto/getModelFieldValues.dto';
import { ConnectionManagerService } from '../connections/connection-manager.service';
import { ConnectionsService } from '../connections/connections.service';
import queries from '../database/queries';

@Injectable()
export class ModelItemsFieldService {
  constructor(
    private modelsRepositoryService: ModelsRepositoryService,
    private modelItemsRepositoryService: ModelItemsRepositoryService,
    private modelItemsFieldRepositoryService: ModelItemsFieldRepositoryService,
    private modelItemsRelationRepositoryService: ModelItemsRelationRepositoryService,
    private connectionManager: ConnectionManagerService,
    private connectionsService: ConnectionsService,
  ) {}

  async getFieldValues(data: GetModelFieldValuesDto) {
    try {
      const field = await this.modelItemsFieldRepositoryService.findOneById(data.modelItemFieldId);

      const query = queries.modelItemsFieldValuesQuery({
        fields: [field.original_name],
        tableName: field.model_item.table_name,
      });

      return await this.connectionsService.execRawQuery(data.connectionId, query);
    } catch (e) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Such field does not exist',
      }, HttpStatus.BAD_REQUEST);
    }
  }
}
