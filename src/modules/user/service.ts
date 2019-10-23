import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import User from '../../database/entities/user.entity';
import BaseService from '../../base/base.service';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  getByUserName(name: string) {
    return this.userRepository.find({where: { name}});
  }
}
