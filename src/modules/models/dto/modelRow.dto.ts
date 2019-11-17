import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ModelRow {
  @ApiModelProperty()
  @IsString()
  originalName: string;

  @ApiModelProperty()
  @IsString()
  givenName: string;

  @ApiModelProperty()
  @IsString()
  type: string;
}
