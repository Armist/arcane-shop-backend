import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  img: string;
}
