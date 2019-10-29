import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import CreateDto from './dto/create.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
  ) {}

  @Post()
  create(@Body() createDto: CreateDto) {
    return this.usersService.create(createDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get('/admins')
  async getAdmins() {
    return await this.usersService.getUsersByType('admin');
  }
}
