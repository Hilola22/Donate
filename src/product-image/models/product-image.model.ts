import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "../../products/models/product.model";

interface IProductImageCreationAttr{
    product_id: number;
    image_url: string;
    is_main: boolean;
}
@Table({ tableName: "product-image" })
export class ProductImage extends Model<
  ProductImage,
  IProductImageCreationAttr
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare image_url: string;

  @Column({
    type: DataType.BOOLEAN
  })
  declare is_main: boolean;

  @ForeignKey(()=> Product)
  @Column({
    type: DataType.INTEGER,
  })
  declare product_id: number;

  @BelongsTo(()=> Product)
  product: Product;
}
