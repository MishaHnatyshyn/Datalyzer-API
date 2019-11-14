import { Injectable } from '@nestjs/common';
import BaseRepositoryService from '../../base/baseRepositoryService';
import DataModel from '../database/entities/data-model.entity';

@Injectable()
export class ModelsRepositoryService extends BaseRepositoryService<DataModel> {}
