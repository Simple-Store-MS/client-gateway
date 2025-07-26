import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCTS_SERVICE } from '../config/services-tokens';
import { envs } from '../config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCTS_SERVICE,
        transport: Transport.TCP,
        options: { host: envs.productsMS.host, port: envs.productsMS.port },
      },
    ]),
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
