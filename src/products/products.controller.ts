import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PRODUCTS_SERVICE } from '../config/services-tokens';
import { ClientProxy } from '@nestjs/microservices';
import { Pagination } from '../common/dto/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCTS_SERVICE)
    private readonly productsService: ClientProxy,
  ) {}

  @Post()
  createProduct(@Body() input: CreateProductDto) {
    return this.productsService.send('CREATE_PRODUCT', input);
  }

  @Get()
  getProducts(@Query() input: Pagination) {
    return this.productsService.send('FIND_PRODUCTS', input);
  }

  @Get(':id')
  getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.send('FIND_PRODUCT', { id });
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: UpdateProductDto,
  ) {
    return this.productsService.send('UPDATE_PRODUCT', { id, ...input });
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.send('DELETE_PRODUCT', { id });
  }
}
