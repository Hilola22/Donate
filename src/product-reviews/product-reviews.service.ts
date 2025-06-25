import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateProductReviewDto } from "./dto/create-product-review.dto";
import { UpdateProductReviewDto } from "./dto/update-product-review.dto";
import { ProductReview } from "./models/product-review.model";
import { ProductOrder } from "../product-orders/models/product-order.model";
import { Product } from "../products/models/product.model";
import { Users } from "../users/models/user.model";

@Injectable()
export class ProductReviewsService {
  constructor(
    @InjectModel(ProductReview) private productReviewModel: typeof ProductReview
  ) {}

  async create(createProductReviewDto: CreateProductReviewDto) {
    const order = await ProductOrder.findByPk(createProductReviewDto.order_id);
    if (!order) {
      throw new NotFoundException("Order not found");
    }
    const product = await Product.findByPk(createProductReviewDto.product_id);
    if (!product) {
      throw new NotFoundException("Product not found");
    }
    const user = await Users.findByPk(createProductReviewDto.user_id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return this.productReviewModel.create(createProductReviewDto);
  }

  findAll() {
    return this.productReviewModel.findAll({
      include: [
        {
          model: ProductOrder,
          attributes: ["id", "quantity", "total_price", "status"],
        },
        {
          model: Product,
          attributes: ["id", "name", "price"],
        },
        {
          model: Users,
          attributes: ["id", "full_name", "email"],
        },
      ],
    });
  }

  findOne(id: number) {
    return this.productReviewModel.findByPk(id, {
      include: [
        {
          model: ProductOrder,
          attributes: ["id", "quantity", "total_price", "status"],
        },
        {
          model: Product,
          attributes: ["id", "name", "price"],
        },
        {
          model: Users,
          attributes: ["id", "full_name", "email"],
        },
      ],
    });
  }

  async update(id: number, updateProductReviewDto: UpdateProductReviewDto) {
    const review = await this.productReviewModel.update(
      updateProductReviewDto,
      {
        where: { id },
        returning: true,
      }
    );
    return review[1][0];
  }

  async remove(id: number) {
    const result = await this.productReviewModel.destroy({ where: { id } });
    if (result > 0) {
      return `${id}-product review deleted!`;
    }
    return `${id}-product review not found!`;
  }
}
