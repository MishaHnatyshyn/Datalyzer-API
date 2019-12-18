import { Inject, Injectable } from '@nestjs/common';
import BaseRepositoryService from '../../base/baseRepository.service';
import DataModel from '../database/entities/data-model.entity';
import { MODEL_REPOSITORY } from '../../constants';
import {EntityManager, Repository} from 'typeorm';
import DataModelItem from '../database/entities/data-model-item.entity';
import DataModelItemField from '../database/entities/data-model-item-field.entity';
import {searchQuery} from '../../base/utils';
import DataModelItemRelation from '../database/entities/data-model-item-relation.entity';

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

  getPaginatedModelList(skip: number, itemsPerPage: number, search: string, admin: number) {
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
      .where({ admin_id: admin, name: searchQuery(search) })
      .innerJoin('model.db_connection', 'connection')
      .innerJoin(DataModelItem, 'table', 'table.model_id = model.id')
      .innerJoin(DataModelItemField, 'field', 'field.model_item_id = table.id')
      .groupBy('model.created_at, model.name, connection.name, model.id, model.active')
      .skip(skip)
      .limit(itemsPerPage)
      .getRawMany();
  }

  getModelsListForReport(creator: number) {
    return this.modelRepository
      .createQueryBuilder('model')
      .select([
        'model.id',
        'model.name',
        'table.id',
        'table.name',
        'field.id',
        'field.type',
        'field.given_name',
        'relation.id',
      ])
      .where({ admin_id: creator })
      .innerJoin('model.modelItems', 'table')
      .innerJoin('table.fields', 'field')
      .leftJoin(
        DataModelItemRelation,
        'relation',
        'table.id = relation.second_model_item_id OR table.id = relation.first_model_item_id',
      )
      .getRawMany();
  }
  renameModel(id) {
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
      .where({ id })
      .innerJoin('model.db_connection', 'connection')
      .innerJoin(DataModelItem, 'table', 'table.model_id = model.id')
      .innerJoin(DataModelItemField, 'field', 'field.model_item_id = table.id')
      .groupBy('model.created_at, model.name, connection.name, model.id, model.active')
      .getRawMany();
  }
}
