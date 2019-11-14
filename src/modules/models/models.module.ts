import { Module } from '@nestjs/common';
import { ModelsController } from './models.controller';
import { ModelsService } from './models.service';
import { ModelsRepositoryService } from './models-repository.service';

@Module({
  controllers: [ModelsController],
  providers: [ModelsService, ModelsRepositoryService],
})
export class ModelsModule {}
