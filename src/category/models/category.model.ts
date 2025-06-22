import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Product } from "../../products/models/product.model";
import { ApiProperty } from "@nestjs/swagger";

interface ICategoryAttr{
    name: string;
}

@Table({ tableName: "category", timestamps: true })
export class Category extends Model<Category, ICategoryAttr> {
  @ApiProperty({
    example: 1,
    description: "Katgeoriyaning unikal idsi",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: 1,
    description: "Katgeoriyaning nomi",
  })
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  declare name: string;

  @HasMany(() => Product, "category_id")
  products: Product[];
}