import { Module } from "@nestjs/common";
import { ProductImageService } from "./product-image.service";
import { ProductImageController } from "./product-image.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { ProductImage } from "./models/product-image.model";
import { ProductsModule } from "../products/products.module";

@Module({
  imports: [SequelizeModule.forFeature([ProductImage]), ProductsModule],
  controllers: [ProductImageController],
  providers: [ProductImageService],
})
export class ProductImageModule {}
