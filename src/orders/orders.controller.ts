import {
  Controller,
  Get,
  Post,
  Param,
  Inject,
  Body,
  Query,
  Patch,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersPagination } from './dto/orders-pagination.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject('ORDERS_SERVICE') private readonly ordersService: ClientProxy,
  ) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.send('CREATE_ORDER', dto);
  }

  @Get()
  findAll(@Query() input: OrdersPagination) {
    return this.ordersService.send('FIND_ORDERS', input);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.send('FIND_ORDER', { id });
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() input: UpdateOrderDto,
  ) {
    return this.ordersService.send('CHANGE_ORDER_STATUS', {
      id,
      ...input,
    });
  }
}
