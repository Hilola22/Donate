import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Product } from "../../products/models/product.model";
import { ApiProperty } from "@nestjs/swagger";

interface IProductImageCreationAttr {
  product_id: number;
  image_url: string;
  is_main: boolean;
}
@Table({ tableName: "product-image" })
export class ProductImage extends Model<
  ProductImage,
  IProductImageCreationAttr
> {
  @ApiProperty({
    example: 1,
    description: "Mahsulot rasmining unikal Idsi",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "image.url",
    description: "Mahsulot rasmining urli",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare image_url: string;

  @ApiProperty({
    example: true,
    description: "Asosiy rasm belgilash",
  })
  @Column({
    type: DataType.BOOLEAN,
  })
  declare is_main: boolean;

  @ApiProperty({
    example: 1,
    description: "Mahsulot IDsi",
  })
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
  })
  declare product_id: number;

  @BelongsTo(() => Product)
  product: Product;
}
