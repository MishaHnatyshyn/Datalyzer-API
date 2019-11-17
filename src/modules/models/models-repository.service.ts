import { Inject, Injectable } from '@nestjs/common';
import BaseRepositoryService from '../../base/baseRepositoryService';
import DataModel from '../database/entities/data-model.entity';
import { MODEL_REPOSITORY } from '../../constants';
import { EntityManager, Repository } from 'typeorm';

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
}
