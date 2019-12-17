import { Test, TestingModule } from '@nestjs/testing';
import { ReportsService } from '../reports.service';
import { ModelsService } from '../../models/models.service';
import { ConnectionManagerService } from '../../connections/connection-manager.service';

describe('ReportsService', () => {
  let service: ReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: ModelsService, useValue: {} },
        { provide: ConnectionManagerService, useValue: {} },
        ReportsService,
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
