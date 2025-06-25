import { Module } from "@nestjs/common";
import { ProductImageService } from "./product-image.service";
import { ProductImageController } from "./product-image.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { ProductImage } from "./models/product-image.model";
import { ProductsModule } from "../products/products.module";
import { FilesModule } from "../files/files.module";

@Module({
  imports: [SequelizeModule.forFeature([ProductImage]), ProductsModule, FilesModule],
  controllers: [ProductImageController],
  providers: [ProductImageService],
})
export class ProductImageModule {}
