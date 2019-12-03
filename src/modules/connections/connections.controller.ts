import {Body, Controller, Post, UseGuards, Request, Get, Query, Param} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {CreateConnectionDto} from './dto/createConnection.dto';
import {ConnectionsService} from './connections.service';
import { SearchDto } from '../users/dto/searchDto';
import {ConnectionTablesDto} from './dto/connectionTables.dto';
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiUseTags} from '@nestjs/swagger';
import {ConnectionResponseObject} from './response-objects/connection-response-object';
import {ConnectionTablesResponseObject} from './response-objects/connection-tables-response-object';
import {ConnectionsCountResponseObject} from './response-objects/connections-count-response-object';
import { CheckConnectionDto } from './dto/checkConnection.dto';

@ApiUseTags('connections')
@Controller('connections')
export class ConnectionsController {
  constructor(
    private connectionsService: ConnectionsService,
  ) {}

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ConnectionResponseObject })
  @UseGuards(AuthGuard('admin'))
  @Post()
  create(@Body() data: CreateConnectionDto, @Request() { user }) {
    return this.connectionsService.createNewConnection(data, user.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: [ConnectionResponseObject] })
  @UseGuards(AuthGuard('admin'))
  @Get()
  getAll(@Query() { page, itemsPerPage, search }: SearchDto, @Request() { user }) {
    return this.connectionsService.getConnectionsList(page, itemsPerPage, search, user.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: ConnectionsCountResponseObject })
  @UseGuards(AuthGuard('admin'))
  @Get('count')
  getCount(@Request() { user }) {
    return this.connectionsService.getConnectionsCount(user.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: [ConnectionTablesResponseObject] })
  @UseGuards(AuthGuard('admin'))
  @Get(':id/tables')
  getDescription(@Param() { id }: ConnectionTablesDto) {
    return this.connectionsService.getConnectionTables(id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({type: []})
  @UseGuards(AuthGuard('user'))
  @Get(':id/check')
  checkIfReachable(@Param() { id }: CheckConnectionDto) {
    return this.connectionsService.isReachable(id);
  }
}
