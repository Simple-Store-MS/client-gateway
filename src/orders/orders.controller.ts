import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  Patch,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersPagination } from './dto/orders-pagination.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { NatsService } from '../transports/nats/nats.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly natsService: NatsService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.natsService.send('CREATE_ORDER', dto);
  }

  @Get()
  findAll(@Query() input: OrdersPagination) {
    return this.natsService.send('FIND_ORDERS', input);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.natsService.send('FIND_ORDER', { id });
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() input: UpdateOrderDto,
  ) {
    return this.natsService.send('CHANGE_ORDER_STATUS', {
      id,
      ...input,
    });
  }
}
