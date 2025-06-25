import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "../../products/models/product.model";
import { Users } from "../../users/models/user.model";

interface ISavedItemsCreationAttr{
    user_id: number;
    product_id: number;
}

@Table({ tableName: "saved-items" })
export class SavedItem extends Model<SavedItem, ISavedItemsCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Savatdagi mahsulotning unikal Idsi",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: 1,
    description: "Foydalanuvchining Id raqami",
  })
  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
  })
  declare user_id: number;

  @ApiProperty({
    example: 1,
    description: "Mahsulotning Id raqami",
  })
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
  })
  declare product_id: number;

  @BelongsTo(() => Users)
  user: Users;

  @BelongsTo(() => Product)
  product: Product;
}
