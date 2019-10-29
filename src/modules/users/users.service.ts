import {Injectable, Inject, HttpException, HttpStatus} from '@nestjs/common';
import { Repository } from 'typeorm';
import User from '../database/entities/user.entity';
import BaseRepositoryService from '../../base/baseRepositoryService';
import CreateUserDto from './dto/create.dto';
import {USER_REPOSITORY, USER_TYPE_REPOSITORY} from '../../constants';
import {BcryptService} from "../../base/bcrypt.service";
import UserType from "../database/entities/userType.entity";

@Injectable()
export class UsersService extends BaseRepositoryService<User> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: Repository<User>,
    @Inject(USER_TYPE_REPOSITORY)
    private readonly userTypeRepository: Repository<UserType>,
    private readonly bcryptService: BcryptService
  ) {
    super(userRepository);
  }

  async create(user: CreateUserDto, adminId: number): Promise<User> {
    const newUser = new User();
    const isUsernameNotUniq = await this.getByUserName(user.username);
    if (isUsernameNotUniq) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'User with such username already exists.',
      }, 400);
    }

    const doesUserTypeExist = await this.checkIfUserTypeExists(user.user_type_id);
    if (!doesUserTypeExist) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Wrong user type id.',
      }, 400);
    }

    newUser.username = user.username;
    newUser.description = user.description || '';
    newUser.password = await this.bcryptService.hashPassword(user.password);
    newUser.user_type_id = user.user_type_id;
    newUser.created_at = new Date().toISOString();
    newUser.updated_at = new Date().toISOString();
    newUser.created_by_id = adminId;
    return this.userRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return super.findAll({relations: ['user_type']});
  }

  getByUserName(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: {username},
      relations: ['user_type'],
    });
  }

  getUsersByType(type: string): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('users')
      .innerJoin(
        'users.user_type',
        'user_type',
        'user_type.name = :type',
        {type} )
      .getMany();
  }

  getUserByType(whereOptions: object, type: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder('users')
      .where(whereOptions)
      .innerJoin(
        'users.user_type',
        'user_type',
        'user_type.name = :type',
        {type} )
      .getOne();
  }

  getUserWithLoginCredits(username: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .innerJoinAndSelect('users.user_type', 'user_type')
      .where({username})
      .getOne();
  }

  async checkIfUserTypeExists(typeId: number): Promise<boolean> {
    const type = await this.userTypeRepository.findOne(typeId);
    return !!type
  }

}
