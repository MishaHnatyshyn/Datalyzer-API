import { Controller, Get, Post, Body, Request, UseGuards, Query, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import CreateDto from './dto/create.dto';
import { SearchDto } from './dto/searchDto';
import { AuthGuard } from '@nestjs/passport';
import { NewPasswordDto } from './dto/newPassword.dto';
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiUseTags} from '@nestjs/swagger';
import {UserResponseObject} from './response-objects/user-response-object';
import {UserCountResponseObject} from './response-objects/user-count-response-object';

@ApiUseTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
  ) {}

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserResponseObject })
  @UseGuards(AuthGuard('admin'))
  @Post()
  create(@Body() createDto: CreateDto, @Request() req) {
    return this.usersService.create(createDto, req.user.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: [UserResponseObject] })
  @UseGuards(AuthGuard('admin'))
  @Get()
  findAll(@Query() { page, itemsPerPage, search }: SearchDto, @Request() req) {
    return this.usersService.getUserList(page, itemsPerPage, search, req.user.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: UserCountResponseObject })
  @UseGuards(AuthGuard('admin'))
  @Get('count')
  getCount(@Request() { user }) {
    return this.usersService.getUsersCount(user.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: UserResponseObject})
  @UseGuards(AuthGuard('user'))
  @Get('/me')
  getUserData(@Request() req) {
    return req.user;
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: [UserResponseObject] })
  @UseGuards(AuthGuard('admin'))
  @Get('/admins')
  async getAdmins() {
    return await this.usersService.getUsersByType('admin');
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: UserResponseObject })
  @UseGuards(AuthGuard('user'))
  @Put('/change-password')
  changePassword(@Body() newPasswordDto: NewPasswordDto, @Request() { user }) {
    return this.usersService.changePassword(newPasswordDto, user.id);
  }
}
