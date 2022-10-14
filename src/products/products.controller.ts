import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { FilterProductsDto } from './dto/filter-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get('')
  async get(@Query() filterProductsDto: FilterProductsDto) {
    return this.productsService.findProducts(filterProductsDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const product: Product = await this.productsService.findOne(id);
    if (product) return product;
    else throw new HttpException('Product Not Found!', HttpStatus.NOT_FOUND);
  }

  @Patch(':id/update')
  async update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    const product: Product = await this.productsService.findOne(id);
    if (product) {
      return await this.productsService.update(id, updateProductDto);
    } else throw new HttpException('Product Not Found!', HttpStatus.NOT_FOUND);
  }

  @Delete(':id/delete')
  async remove(@Param('id') id: number) {
    const product: Product = await this.productsService.findOne(id);
    if (product) {
      return await this.productsService.remove(id);
    } else throw new HttpException('Product Not Found!', HttpStatus.NOT_FOUND);
  }
}
