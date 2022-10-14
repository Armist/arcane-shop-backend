import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private readonly repository: Repository<Category>) {
  }

  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.repository.create(createCategoryDto);
    return this.repository.save(category);
  }

  findAll(): Promise<Category[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<Category> {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.repository.preload({
      id,
      ...updateCategoryDto,
    });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return this.repository.save(category);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    return this.repository.remove(category);
  }
}
