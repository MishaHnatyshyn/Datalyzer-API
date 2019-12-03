import { ApiUseTags, ApiBearerAuth, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { Body, Controller, Get, Query, Post, Request, UseGuards } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ModelsService} from './models.service';
import {ModelsCountResponseObject} from './response-objects/models-count-response-object';
import { CreateModelDto } from './dto/createModel.dto';
import { ModelDetailsResponseObject } from './response-objects/model-details-response-object';
import {SearchDto} from '../users/dto/searchDto';

@ApiUseTags('models')
@Controller('models')
export class ModelsController {
  constructor(
    private modelsService: ModelsService,
  ) {}

  @UseGuards(AuthGuard('admin'))
  @Get()
  getAll(@Query() { page, itemsPerPage, search }: SearchDto, @Request() { user }) {
    return this.modelsService.getModelsList(page, itemsPerPage, search, user.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: ModelsCountResponseObject })
  @UseGuards(AuthGuard('admin'))
  @Get('count')
  getCount(@Request() { user }) {
    return this.modelsService.getModelsCount(user.id);
  }

  @ApiCreatedResponse({ type: ModelDetailsResponseObject })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('admin'))
  @Post()
  create(@Body() data: CreateModelDto, @Request() { user }) {
    return this.modelsService.createModel(data, user.id);
  }
}
