import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ModelRow } from './modelRow.dto';
import { ApiModelProperty } from '@nestjs/swagger';

export class ModelItem {
  @ApiModelProperty()
  @IsString()
  tableName: string;

  @ApiModelProperty()
  @IsString()
  name: string;

  @ApiModelProperty({ type: [ModelRow] })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => ModelRow)
  rows: ModelRow[];
}
