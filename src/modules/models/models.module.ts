import { Module } from '@nestjs/common';
import { ModelsController } from './models.controller';
import { ModelsService } from './models.service';
import { ModelsRepositoryService } from './models-repository.service';
import { ModelItemsRepositoryService } from './model-items-repository.service';
import { ModelItemsFieldRepositoryService } from './model-items-field-repository.service';
import { ModelItemsRelationRepositoryService } from './model-items-relation-repository.service';
import DatabaseModule from '../database';
import modelsProviders from './models.providers';
import { ModelItemsFieldService } from './model-items-field-.service';
import { ConnectionManagerService } from '../connections/connection-manager.service';
import { ConnectionsService } from '../connections/connections.service';
import { ConnectionsRepositoryService } from '../connections/connections-repository.service';
import { ConnectionTypeRepositoryService } from '../connections/connection-type-repository.service';
import connectionsProviders from '../connections/connections.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ModelsController],
  providers: [
    ...modelsProviders,
    ...connectionsProviders,
    ModelsService,
    ModelsRepositoryService,
    ModelItemsRepositoryService,
    ModelItemsFieldRepositoryService,
    ModelItemsRelationRepositoryService,
    ModelItemsFieldService,
    ConnectionManagerService,
    ConnectionsService,
    ConnectionsRepositoryService,
    ConnectionTypeRepositoryService,
  ],
})
export class ModelsModule {}
