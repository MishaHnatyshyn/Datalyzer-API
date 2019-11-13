import { Test, TestingModule } from '@nestjs/testing';
import { ModelsRepositoryService } from '../models-repository.service';

describe('ModelsRepositoryService', () => {
  let service: ModelsRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModelsRepositoryService],
    }).compile();

    service = module.get<ModelsRepositoryService>(ModelsRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
