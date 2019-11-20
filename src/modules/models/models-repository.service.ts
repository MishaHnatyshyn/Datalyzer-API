import { Inject, Injectable } from '@nestjs/common';
import BaseRepositoryService from '../../base/baseRepositoryService';
import DataModel from '../database/entities/data-model.entity';
import { MODEL_REPOSITORY } from '../../constants';
import { EntityManager, Repository } from 'typeorm';
import DataModelItem from '../database/entities/data-model-item.entity';
import DataModelItemField from '../database/entities/data-model-item-field.entity';

@Injectable()
export class ModelsRepositoryService extends BaseRepositoryService<DataModel> {
  constructor(
    @Inject(MODEL_REPOSITORY)
    private readonly modelRepository: Repository<DataModel>,
  ) {
    super(modelRepository);
  }

  createModel(name: string, adminId: number, connectionId: number, connectionManager?: EntityManager) {
    const model = new DataModel();
    model.name = name;
    model.admin_id = adminId;
    model.db_connection_id = connectionId;
    return connectionManager ? connectionManager.save(model) : this.modelRepository.create(model);
  }

  getPaginatedModelList(skip: number, itemsPerPage: number, admin: number) {
    return this.modelRepository
      .createQueryBuilder('model')
      .select([
        'model.name AS name',
        'model.id AS id',
        'model.created_at AS created',
        'model.active AS active',
        'connection.name AS connection',
        'COUNT(table.id) AS tables',
        'COUNT(field.id) AS fields',
      ])
      .where({ admin_id: admin })
      .innerJoin('model.db_connection', 'connection')
      .innerJoin(DataModelItem, 'table', 'table.model_id = model.id')
      .innerJoin(DataModelItemField, 'field', 'field.model_item_id = table.id')
      .groupBy('model.created_at, model.name, connection.name, model.id, model.active')
      .skip(skip)
      .limit(itemsPerPage)
      .getRawMany();
  }
}
