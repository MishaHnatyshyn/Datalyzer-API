import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class ConnectionTablesDto {
  @Type(() => Number)
  @IsNumber()
  id: number;
}
