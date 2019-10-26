import { BaseEntity, Repository } from 'typeorm';

export default class BaseService<Entity extends BaseEntity> {
  constructor(
    public repository: Repository<Entity>,
  ) {}

  async findById(id: number): Promise<Entity> {
    return await this.repository.findOne(id);
  }

  async findAll(): Promise<Entity[]> {
    return await this.repository.find();
  }
}
