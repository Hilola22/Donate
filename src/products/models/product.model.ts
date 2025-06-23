import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Category } from "../../category/models/category.model";
import { Users } from "../../users/models/user.model";
import { ProductImage } from "../../product-image/models/product-image.model";
import { ApiProperty } from "@nestjs/swagger";

interface IProductCreationAttr {
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
  @ApiProperty({
    example: 1,
    description: "Mahsulotning unikal Idsi",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Uzbek brendi",
    description: "Mahsulot nomi",
  })
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare name: string;

  @ApiProperty({
    example: "",
    description: "Mahsulot haqida: 100% paxta tolasidan tayyorlangan",
  })
  @Column({
    type: DataType.STRING,
  })
  declare description: string;

  @ApiProperty({
    example: "Futbolka",
    description: "Mahsulot kategoriya nomi",
  })
  @Column({
    type: DataType.INTEGER,
  })
  declare in_stock: number;

  @ApiProperty({
    example: 150000.0,
    description: "Mahsulot narxi",
  })
  @Column({
    type: DataType.DECIMAL(15, 2),
  })
  declare price: number;

  @ApiProperty({
    example: true,
    description: "Mahsulot mavjudligi, sotuvda borligi",
  })
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

  @ApiProperty({
    example: 1,
    description: "Mahsulotni kategoriyasi Id raqami",
  })
  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
  })
  declare creator_id: number;

  @BelongsTo(() => Users)
  user: Users;

  @HasMany(() => ProductImage)
  images: ProductImage[];
}
