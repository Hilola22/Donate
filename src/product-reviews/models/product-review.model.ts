import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { ProductOrder } from "../../product-orders/models/product-order.model";
import { Product } from "../../products/models/product.model";
import { Users } from "../../users/models/user.model";

interface IProductReviewCreationAttr {
  order_id: number;
  product_id: number;
  user_id: number;
  reting: number;
  comment: string;
}

@Table({ tableName: "product-reviews" })
export class ProductReview extends Model<
  ProductReview,
  IProductReviewCreationAttr
> {
  @ApiProperty({ example: 1, description: "Mahsulot izohining unikal Idsi" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: 1, description: "Buyurtma Idsi" })
  @ForeignKey(() => ProductOrder)
  @Column({ type: DataType.INTEGER })
  declare order_id: number;

  @ApiProperty({ example: 1, description: "Mahsulot Idsi" })
  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER })
  declare product_id: number;

  @ApiProperty({ example: 1, description: "Foydalanuvchi Idsi" })
  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER })
  declare user_id: number;

  @ApiProperty({ example: 5, description: "Mahsulot reytingi" })
  @Column({ type: DataType.INTEGER })
  declare reting: number;

  @ApiProperty({ example: "Yaxshi mahsulot", description: "Izoh matni" })
  @Column({ type: DataType.STRING })
  declare comment: string;

  @BelongsTo(() => ProductOrder)
  order: ProductOrder;

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => Users)
  user: Users;
}
