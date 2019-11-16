import { Module } from '@nestjs/common';
import { ModelsController } from './models.controller';
import { ModelsService } from './models.service';
import { ModelsRepositoryService } from './models-repository.service';
import DatabaseModule from '../database';
import modelsProviders from './models.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ModelsController],
  providers: [...modelsProviders, ModelsService, ModelsRepositoryService],
})
export class ModelsModule {}
