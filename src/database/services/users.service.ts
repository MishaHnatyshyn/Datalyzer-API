import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly photoRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.photoRepository.find();
  }
}
