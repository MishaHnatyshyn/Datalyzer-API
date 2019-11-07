import { Body, Controller, Post, UseGuards, Request, Get, Query } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {CreateConnectionDto} from './dto/createConnection.dto';
import {ConnectionsService} from './connections.service';
import { UserListDto } from '../users/dto/userList.dto';

@Controller('connections')
export class ConnectionsController {
  constructor(
    private connectionsService: ConnectionsService,
  ) {}

  @UseGuards(AuthGuard('admin'))
  @Post()
  create(@Body() data: CreateConnectionDto, @Request() { user }) {
    return this.connectionsService.createNewConnection(data, user.id);
  }

  @UseGuards(AuthGuard('admin'))
  @Get()
  getAll(@Query() { page, itemsPerPage }: UserListDto, @Request() { user }) {
    return this.connectionsService.getConnectionsList(page, itemsPerPage, user.id);
  }
}
