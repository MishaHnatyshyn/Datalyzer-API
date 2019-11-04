import {Controller, Get, Post, Body, Request, UseGuards, Param, Query} from '@nestjs/common';
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
  findAll(@Query() { page, itemsPerPage }: UserListDto, @Request() req) {
    return this.usersService.getUserList(page, itemsPerPage, req.user.id);
  }

  @UseGuards(AuthGuard('user'))
  @Get('/me')
  getUserData(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('admin'))
  @Get('/admins')
  async getAdmins() {
    return await this.usersService.getUsersByType('admin');
  }
}
