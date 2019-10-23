import { BaseEntity, Repository } from 'typeorm';

export default class BaseService<Entity extends BaseEntity> {
  constructor(
    public repository: Repository<Entity>,
  ) {}

  async findById(id: number): Promise<Entity> {
    return await this.repository.findOne(id);
  }

  async findOneByQuery(query): Promise<Entity> {
    return this.repository.findOne({where: query});
  }

  async findAllByQuery(query): Promise<Entity[]> {
    return this.repository.find({where: query});
  }

  async findAll(): Promise<Entity[]> {
    return await this.repository.find();
  }
}
