import { ApiUseTags, ApiBearerAuth, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { Body, Controller, Get, Query, Post, Request, UseGuards, Delete, Param } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ModelsService} from './models.service';
import {ModelsCountResponseObject} from './response-objects/models-count-response-object';
import { CreateModelDto } from './dto/createModel.dto';
import { ModelDetailsResponseObject } from './response-objects/model-details-response-object';
import {SearchDto} from '../shared/dto/searchDto';
import { IdDto } from '../shared/dto/id.dto';
import { DeleteResponseObject } from '../shared/response-objects/delete.response-object';
import { GetModelFieldValuesDto } from './dto/getModelFieldValues.dto';
import { ModelItemsFieldService } from './model-items-field-.service';
import { ModelDataItemFieldResponseObject } from './response-objects/model-data-item-field-response-object';
import ModelForReportResponseObject from './response-objects/model-for-report.response-object';

@ApiUseTags('models')
@Controller('models')
export class ModelsController {
  constructor(
    private modelsService: ModelsService,
    private modelItemsFieldService: ModelItemsFieldService,
  ) {}

  @UseGuards(AuthGuard('admin'))
  @Get()
  getAll(@Query() { page, itemsPerPage, search }: SearchDto, @Request() { user }) {
    return this.modelsService.getModelsList(page, itemsPerPage, search, user.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: [ModelForReportResponseObject] })
  @UseGuards(AuthGuard('user'))
  @Get('report')
  getModelsForReport(@Request() { user }) {
    return this.modelsService.getModelsDataForReport(user.created_by_id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: DeleteResponseObject })
  @UseGuards(AuthGuard('admin'))
  @Delete(':id')
  deleteModel(@Param() { id }: IdDto) {
    return this.modelsService.deleteModel(id);
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

  @ApiCreatedResponse({ type: [ModelDataItemFieldResponseObject]})
  @ApiBearerAuth()
  @UseGuards(AuthGuard('user'))
  @Get('/fieldValues')
  getModelItemFieldValues(@Query() data: GetModelFieldValuesDto) {
    return this.modelItemsFieldService.getFieldValues(data);
  }
}
