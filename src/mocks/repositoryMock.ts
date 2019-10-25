import { BaseEntity } from 'typeorm';

export default (entitiesMock) => (
  class RepositoryApi {
    public entitiesMock: BaseEntity[] = entitiesMock;

    find(params: BaseEntity): Promise<BaseEntity[]> {
      return Promise.resolve(this.entitiesMock);
    }

    create(entity: BaseEntity): Promise<BaseEntity> {
      return Promise.resolve(this.entitiesMock[0]);
    }

    createQueryBuilder(alias: string): any {
      return this;
    }

    innerJoin(property: string, alias: string, condition: string, parameters: object): any {
      return this;
    }

    getMany(): BaseEntity[] {
      return entitiesMock;
    }
  }
);
