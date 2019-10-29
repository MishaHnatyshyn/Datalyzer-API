import { IsNotEmpty } from 'class-validator';

export class JwtDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  id: number;
}

