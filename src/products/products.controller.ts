import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Pagination } from '../common/dto/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NatsService } from '../transports/nats/nats.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly natsService: NatsService) {}

  @Post()
  createProduct(@Body() input: CreateProductDto) {
    return this.natsService.send('CREATE_PRODUCT', input);
  }

  @Get()
  getProducts(@Query() input: Pagination) {
    return this.natsService.send('FIND_PRODUCTS', input);
  }

  @Get(':id')
  getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.natsService.send('FIND_PRODUCT', { id });
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: UpdateProductDto,
  ) {
    return this.natsService.send('UPDATE_PRODUCT', { id, ...input });
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.natsService.send('DELETE_PRODUCT', { id });
  }
}
