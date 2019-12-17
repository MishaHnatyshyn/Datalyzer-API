import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiUseTags } from '@nestjs/swagger';
import { DataForNewReportDto } from './dto/dataForNewReport.dto';
import { ReportsService } from './reports.service';
import { ModelDataItemFieldResponseObject } from './response-objects/model-data-item-field-response-object';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @ApiCreatedResponse({ type: [ModelDataItemFieldResponseObject]})
  @ApiBearerAuth()
  @UseGuards(AuthGuard('user'))
  @Get('data')
  getDataForNewReport(@Query() data: DataForNewReportDto) {
    return this.reportsService.getFieldValues(data.modelItemFieldId);
  }
}
