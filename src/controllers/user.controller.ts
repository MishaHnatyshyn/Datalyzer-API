import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { UsersService } from '../database/services/users.service';

@Controller('user')
export class UsersController {
  constructor(
    private usersService: UsersService,
  ) {}
  // @Post()
  // create(@Body() createCatDto: CreateCatDto) {
  //   return 'This action adds a new cat';
  // }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }
}
