import { Injectable } from '@nestjs/common';
import {ModelsRepositoryService} from './models-repository.service';

@Injectable()
export class ModelsService {
  constructor(
    private modelsRepositoryService: ModelsRepositoryService,
  ) {}

  async getModelsCount(admin: number) {
    const count = await this.modelsRepositoryService.getCount({ admin_id: admin });
    return { count };
  }
}
