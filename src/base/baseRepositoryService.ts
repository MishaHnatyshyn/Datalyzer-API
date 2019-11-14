import { BaseEntity, Repository } from 'typeorm';

export default class BaseRepositoryService<Entity extends BaseEntity> {
  constructor(
    public repository: Repository<Entity>,
  ) {}

  findById(id: number, options?: object): Promise<Entity> {
    return this.repository.findOne(id, options);
  }

  findAll(options?: object): Promise<Entity[]> {
    return this.repository.find(options);
  }

  findOne(options: object): Promise<Entity> {
   return this.repository.findOne(options);
  }

  getPaginatedList(skip: number, itemsPerPage: number, matcher?: object): Promise<Entity[]> {
    return this.repository.find({
      where: matcher,
      skip,
      take: itemsPerPage,
    });
  }
}
