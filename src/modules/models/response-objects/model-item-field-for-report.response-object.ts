import {ApiResponseModelProperty} from '@nestjs/swagger';

export default class ModelItemFieldForReportResponseObject {
  @ApiResponseModelProperty()
  id: number;
  @ApiResponseModelProperty()
  name: string;
  @ApiResponseModelProperty()
  type: string;
}
