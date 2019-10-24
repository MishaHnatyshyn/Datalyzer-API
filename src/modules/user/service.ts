import { Injectable, Inject } from '@nestjs/common';
import { InsertResult, Repository } from 'typeorm';
import User from '../../database/entities/user.entity';
import BaseService from '../../base/base.service';
import CreateUserDto from './dto/create.dto';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async create(user: CreateUserDto): Promise<User> {
    const newUser = new User();
    newUser.name = user.name;
    newUser.password = user.password;
    newUser.user_type_id = user.user_type_id;

    return this.userRepository.create(newUser);
  }

  getByUsersName(name: string): Promise<User[]> {
    return this.userRepository.find({
      where: {name},
      relations: ['user_type'],
    });
  }

  getAdmins() {
    return this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user.user_type', 'user_type', 'user_type.name = :type', {type: 'admin'} )
      .getMany();
  }
}
