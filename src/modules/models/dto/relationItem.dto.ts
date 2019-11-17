import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class RelationItem {
  @ApiModelProperty()
  @IsString()
  firstTableName: string;

  @ApiModelProperty()
  @IsString()
  firstTableColumn: string;

  @ApiModelProperty()
  @IsString()
  secondTableName: string;

  @ApiModelProperty()
  @IsString()
  secondTableColumn: string;
}
