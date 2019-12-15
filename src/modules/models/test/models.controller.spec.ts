import { Test, TestingModule } from '@nestjs/testing';
import { ModelsController } from '../models.controller';
import {ModelsRepositoryService} from '../models-repository.service';
import {ModelsService} from '../models.service';
import { ModelItemsFieldService } from '../model-items-field-.service';

describe('Models Controller', () => {
  let controller: ModelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: ModelsService, useValue: {} },
        { provide: ModelItemsFieldService, useValue: {} },
      ],
      controllers: [
        ModelsController,
      ],
    }).compile();

    controller = module.get<ModelsController>(ModelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
