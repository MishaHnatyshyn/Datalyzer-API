import {ApiResponseModelProperty} from '@nestjs/swagger';
import ModelItemFieldForReportResponseObject from './model-item-field-for-report.response-object';

export default class ModelItemForReportResponseObject {
  @ApiResponseModelProperty()
  id: number;

  @ApiResponseModelProperty()
  name: string;

  @ApiResponseModelProperty()
  relations: number[];

  @ApiResponseModelProperty({ type: [ModelItemFieldForReportResponseObject] })
  fields: ModelItemFieldForReportResponseObject[];
}
