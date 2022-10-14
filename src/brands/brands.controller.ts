import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {
  }

  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  @Get()
  findAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const brand = await this.brandsService.findOne(id);
    if (brand) return brand;
    else throw new HttpException('Brand Not Found!', HttpStatus.NOT_FOUND);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateBrandDto: UpdateBrandDto) {
    const brand = await this.brandsService.findOne(id);
    if (brand) {
      return await this.brandsService.update(id, updateBrandDto);
    } else throw new HttpException('Brand Not Found!', HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const brand = await this.brandsService.findOne(id);
    if (brand) {
      return await this.brandsService.remove(id);
    } else throw new HttpException('Brand Not Found!', HttpStatus.NOT_FOUND);
  }
}
