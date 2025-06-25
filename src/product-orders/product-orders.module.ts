import { Module } from "@nestjs/common";
import { ProductOrdersService } from "./product-orders.service";
import { ProductOrdersController } from "./product-orders.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { ProductOrder } from "./models/product-order.model";
import { UsersModule } from "src/users/users.module";
import { ProductsModule } from "src/products/products.module";
import { CourierModule } from "src/courier/courier.module";

@Module({
  imports: [
    SequelizeModule.forFeature([ProductOrder]),
    UsersModule,
    ProductsModule,
    CourierModule,
  ],
  controllers: [ProductOrdersController],
  providers: [ProductOrdersService],
  exports: [ProductOrdersService],
})
export class ProductOrdersModule {}
