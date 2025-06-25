import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ProductReviewsService } from "./product-reviews.service";
import { ProductReviewsController } from "./product-reviews.controller";
import { ProductReview } from "./models/product-review.model";
import { ProductOrder } from "../product-orders/models/product-order.model";
import { Product } from "../products/models/product.model";
import { Users } from "../users/models/user.model";

@Module({
  imports: [
    SequelizeModule.forFeature([ProductReview, ProductOrder, Product, Users]),
  ],
  controllers: [ProductReviewsController],
  providers: [ProductReviewsService],
  exports: [ProductReviewsService],
})
export class ProductReviewsModule {}
