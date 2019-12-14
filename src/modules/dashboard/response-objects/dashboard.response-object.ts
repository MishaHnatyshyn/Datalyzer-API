import { ApiResponseModelProperty } from '@nestjs/swagger';

export class DashboardResponseObject {
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
}
