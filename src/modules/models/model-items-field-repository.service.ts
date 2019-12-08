import { Inject, Injectable } from '@nestjs/common';
import BaseRepositoryService from '../../base/baseRepository.service';
import { MODEL_ITEM_FIELD_REPOSITORY } from '../../constants';
import { Repository } from 'typeorm';
import DataModelItemField from '../database/entities/data-model-item-field.entity';
import { ModelRow } from './dto/modelRow.dto';

@Injectable()
export class ModelItemsFieldRepositoryService extends BaseRepositoryService<DataModelItemField> {
  constructor(
    @Inject(MODEL_ITEM_FIELD_REPOSITORY)
    private readonly modelItemFieldRepository: Repository<DataModelItemField>,
  ) {
    super(modelItemFieldRepository);
  }

  private formModelItemFieldEntity({ originalName, givenName, type, modelItemId }) {
    const modelItemField = new DataModelItemField();
    modelItemField.given_name = givenName;
    modelItemField.original_name = originalName;
    modelItemField.type = type;
    modelItemField.model_item_id = modelItemId;
    return this.modelItemFieldRepository.create(modelItemField);
  }

  async createModelItemFields(modelItemFieldsData: ModelRow[], modelItemId, connectionManager?) {
    const modelItemFields = await modelItemFieldsData.map(item =>
      this.formModelItemFieldEntity({ ...item, modelItemId }),
    );
    return connectionManager
      ? connectionManager.save(modelItemFields)
      : this.modelItemFieldRepository.save(modelItemFields);
  }
}
