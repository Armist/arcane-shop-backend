import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {
  }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const category = await this.categoriesService.findOne(id);
    if (category) return category;
    else throw new HttpException('Category Not Found!', HttpStatus.NOT_FOUND);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesService.findOne(id);
    if (category) {
      return await this.categoriesService.update(id, updateCategoryDto);
    } else throw new HttpException('Category Not Found!', HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const category = await this.categoriesService.findOne(id);
    if (category) {
      return await this.categoriesService.remove(id);
    } else throw new HttpException('Category Not Found!', HttpStatus.NOT_FOUND);
  }
}
