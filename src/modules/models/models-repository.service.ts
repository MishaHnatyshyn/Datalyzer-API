import {Inject, Injectable} from '@nestjs/common';
import BaseRepositoryService from '../../base/baseRepositoryService';
import DataModel from '../database/entities/data-model.entity';
import {MODEL_REPOSITORY} from '../../constants';
import {Repository} from 'typeorm';

@Injectable()
export class ModelsRepositoryService extends BaseRepositoryService<DataModel> {
  constructor(
    @Inject(MODEL_REPOSITORY)
    private readonly modelRepository: Repository<DataModel>,
  ) {
    super(modelRepository);
  }
}
