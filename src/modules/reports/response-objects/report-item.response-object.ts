import { ApiResponseModelProperty } from '@nestjs/swagger';

export class ReportItemResponseObject {
  @ApiResponseModelProperty()
  report_id: number;

  @ApiResponseModelProperty()
  name: string;

  @ApiResponseModelProperty()
  model_item_field_id: number;

  @ApiResponseModelProperty()
  id: number;

  @ApiResponseModelProperty()
  created_at: string;

  @ApiResponseModelProperty()
  updated_at: string;
}
