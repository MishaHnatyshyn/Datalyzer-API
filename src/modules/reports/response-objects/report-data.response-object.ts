import { ApiResponseModelProperty } from '@nestjs/swagger';
import { ModelDataItemFieldResponseObject } from './model-data-item-field-response-object';

export class ReportDataResponseObject {
  @ApiResponseModelProperty()
  dashboard_id: number;

  @ApiResponseModelProperty()
  name: string;

  @ApiResponseModelProperty()
  user_id: number;

  @ApiResponseModelProperty()
  report_type_id: number;

  @ApiResponseModelProperty()
  id: number;

  @ApiResponseModelProperty()
  width: number;

  @ApiResponseModelProperty()
  height: number;

  @ApiResponseModelProperty()
  position_x: number;

  @ApiResponseModelProperty()
  position_y: number;

  @ApiResponseModelProperty()
  created_at: string;

  @ApiResponseModelProperty()
  updated_at: string;

  @ApiResponseModelProperty({ type: [ModelDataItemFieldResponseObject] })
  report_items: ModelDataItemFieldResponseObject[];

  @ApiResponseModelProperty()
  dimensions: string[];

  @ApiResponseModelProperty()
  facts: string[];
}
