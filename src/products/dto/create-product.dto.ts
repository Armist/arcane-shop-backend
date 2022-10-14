import { IsArray, IsDecimal, IsNotEmpty, IsString } from 'class-validator';
import { Category } from '../../categories/entities/category.entity';
import { Brand } from '../../brands/entities/brand.entity';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  img: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDecimal()
  @IsNotEmpty()
  price: number;

  @IsArray()
  @IsNotEmpty()
  category: Category[];

  @IsArray()
  @IsNotEmpty()
  brand: Brand[];
}
