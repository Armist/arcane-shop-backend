import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private readonly repository: Repository<Brand>) {
  }

  create(createBrandDto: CreateBrandDto): Promise<Brand> {
    const brand = this.repository.create(createBrandDto);
    return this.repository.save(brand);
  }

  findAll(): Promise<Brand[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<Brand> {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: number, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    const brand = await this.repository.preload({
      id,
      ...updateBrandDto,
    });
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return this.repository.save(brand);
  }

  async remove(id: number) {
    const brand = await this.findOne(id);
    return this.repository.remove(brand);
  }
}
