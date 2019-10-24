import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UsersService } from './service';
import CreateDto from './dto/create.dto';

@Controller('user')
export class UsersController {
  constructor(
    private usersService: UsersService,
  ) {}

  @Post()
  create(@Body() createDto: CreateDto) {
    return this.usersService.create(createDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get('/admins')
  async getAdmins() {
    return await this.usersService.getAdmins();
  }
}
