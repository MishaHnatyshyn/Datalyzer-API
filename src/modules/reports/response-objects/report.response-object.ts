import { ApiResponseModelProperty } from '@nestjs/swagger';
import { ReportItemResponseObject } from './report-item.response-object';

export class ReportResponseObject {
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

  @ApiResponseModelProperty({ type: [ReportItemResponseObject] })
  report_items: ReportItemResponseObject[];
}
