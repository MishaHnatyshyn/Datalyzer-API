import {ApiResponseModelProperty} from '@nestjs/swagger';

export class ModelDataItemFieldResponseObject {
  @ApiResponseModelProperty()
  'field-name': 'field-data';
}
