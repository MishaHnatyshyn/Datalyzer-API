import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class DashboardCreateDto {
  @ApiModelProperty()
  @IsString()
  name: string;
}
