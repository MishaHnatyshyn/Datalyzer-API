import { ApiUseTags, ApiBearerAuth, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ModelsService} from './models.service';
import {ModelsCountResponseObject} from './response-objects/models-count-response-object';
import { CreateModelDto } from './dto/createModel.dto';
import { ModelDetailsResponseObject } from './response-objects/model-details-response-object';

@ApiUseTags('models')
@Controller('models')
export class ModelsController {
  constructor(
    private modelsService: ModelsService,
  ) {}

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
