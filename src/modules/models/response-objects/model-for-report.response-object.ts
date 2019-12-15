import {ApiResponseModelProperty} from '@nestjs/swagger';
import ModelItemForReportResponseObject from './model-item-for-report.response-object';

export default class ModelForReportResponseObject {
  @ApiResponseModelProperty()
  id: number;

  @ApiResponseModelProperty()
  name: string;

  @ApiResponseModelProperty({ type: [ModelItemForReportResponseObject] })
  items: ModelItemForReportResponseObject[];
}
