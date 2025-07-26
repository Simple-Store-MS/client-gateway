import { IsBoolean, IsEnum, IsOptional, IsPositive } from 'class-validator';

import { OrderStatus } from '../enums/order.status.enum';

export class CreateOrderDto {
  @IsBoolean()
  paid: boolean;

  @IsEnum(OrderStatus)
  @IsOptional()
  status: OrderStatus = OrderStatus.PENDING;

  @IsPositive()
  totalAmount: number;

  @IsPositive()
  totalItems: number;
}
