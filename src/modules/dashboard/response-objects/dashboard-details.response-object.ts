import { ApiResponseModelProperty } from '@nestjs/swagger';
import { DashboardReportResponseObject } from './dashboard-report.response-object';

export class DashboardDetailsResponseObject {
  @ApiResponseModelProperty()
  id: number;

  @ApiResponseModelProperty()
  name: string;

  @ApiResponseModelProperty()
  user_id: number;

  @ApiResponseModelProperty()
  created_at: string;

  @ApiResponseModelProperty()
  updated_at: string;

  @ApiResponseModelProperty({ type: [DashboardReportResponseObject] })
  reports: DashboardReportResponseObject[];
}
