import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Category } from "../../category/models/category.model";
import { Users } from "../../users/models/user.model";
import { ProductImage } from "../../product-image/models/product-image.model";

interface IProductCreationAttr{
    name: string;
    description: string;
    in_stock: number;
    price: number;
    is_available: boolean;
    creator_id: number;
    category_id: number;
}

@Table({ tableName: "products" })
export class Product extends Model<Product, IProductCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
  })
  declare description: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare in_stock: number;

  @Column({
    type: DataType.DECIMAL(15, 2),
  })
  declare price: number;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare is_available: boolean;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  declare category_id: number;

  @BelongsTo(() => Category)
  category: Category;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
  })
  declare creator_id: number;

  @BelongsTo(() => Users)
  user: Users;

  @HasMany(() => ProductImage)
  images: ProductImage[]
}
