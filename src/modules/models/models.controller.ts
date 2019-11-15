import {ApiUseTags, ApiBearerAuth, ApiOkResponse} from '@nestjs/swagger';
import {Controller, Get, Request, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ModelsService} from './models.service';
import {ModelsCountResponseObject} from './response-objects/models-count-response-object';

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
}
