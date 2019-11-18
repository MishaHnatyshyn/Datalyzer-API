import { Test, TestingModule } from '@nestjs/testing';
import { ModelsService } from '../models.service';
import {ModelsRepositoryService} from '../models-repository.service';
import { ModelItemsRepositoryService } from '../model-items-repository.service';
import { ModelItemsFieldRepositoryService } from '../model-items-field-repository.service';
import { ModelItemsRelationRepositoryService } from '../model-items-relation-repository.service';

describe('ModelsService', () => {
  let service: ModelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: ModelsRepositoryService, useValue: {} },
        { provide: ModelItemsRepositoryService, useValue: {} },
        { provide: ModelItemsFieldRepositoryService, useValue: {} },
        { provide: ModelItemsRelationRepositoryService, useValue: {} },
        ModelsService
      ],
    }).compile();

    service = module.get<ModelsService>(ModelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
