import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterProductsDto } from './dto/filter-products.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private readonly repository: Repository<Product>) {
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.repository.create(createProductDto);

    await console.log(product);

    return await this.repository.save({
      ...product,
      categories: createProductDto.category,
      brands: createProductDto.brand,
    });
  }

  findOne(id: number): Promise<Product> {
    return this.repository.findOne({ where: { id }, relations: ['brands'] });
  }

  async findProducts(filterProductsDto: FilterProductsDto): Promise<Product[] | HttpException> {
    const { title, brand, category } = filterProductsDto;
    let builder = this.repository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.brands', 'brand')
      .leftJoinAndSelect('product.categories', 'category');

    if (title) builder.where('product.title LIKE :title', { title: `%${title}%` });
    if (brand) builder.andWhere('brand.title = :brand', { brand });
    if (category) builder.andWhere('category.title = :category', { category });

    const products = await builder.getMany();

    const thrower = () => {
      throw new HttpException('Products Not Found!', HttpStatus.NOT_FOUND);
    };

    return products.length ? products : thrower();
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.repository.preload({
      id,
      ...updateProductDto,
    });
    return this.repository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    return this.repository.remove(product);
  }
}
