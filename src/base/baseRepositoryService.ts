import { BaseEntity, Repository } from 'typeorm';

export default class BaseRepositoryService<Entity extends BaseEntity> {
  constructor(
    public repository: Repository<Entity>,
  ) {}

  findById(id: number): Promise<Entity> {
    return this.repository.findOne(id);
  }

  findAll(): Promise<Entity[]> {
    return this.repository.find();
  }
}
