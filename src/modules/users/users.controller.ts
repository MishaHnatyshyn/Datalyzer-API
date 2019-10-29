import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import CreateDto from './dto/create.dto';
import {UserListDto} from "./dto/userList.dto";
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard('admin'))
  @Post()
  create(@Body() createDto: CreateDto, @Request() req) {
    return this.usersService.create(createDto, req.user.id);
  }

  @UseGuards(AuthGuard('admin'))
  @Get()
  async findAll(body: UserListDto, @Request() req) {
    return await this.usersService.getUserList(body.page, body.itemsPerPage, req.user.userId);
  }

  @UseGuards(AuthGuard('admin'))
  @Get('/admins')
  async getAdmins() {
    return await this.usersService.getUsersByType('admin');
  }
}
