import {Body, Controller, Post, UseGuards, Request, Get, Query, Param} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {CreateConnectionDto} from './dto/createConnection.dto';
import {ConnectionsService} from './connections.service';
import { UserListDto } from '../users/dto/userList.dto';
import {ConnectionTablesDto} from "./dto/connectionTables.dto";

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

  @UseGuards(AuthGuard('admin'))
  @Get(':id/tables')
  getDescription(@Param() { id }: ConnectionTablesDto) {
    return this.connectionsService.getConnectionTables(id)
  }
}
