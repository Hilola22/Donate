import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Users } from "../../users/models/user.model";
import { Product } from "../../products/models/product.model";
import { Courier } from "../../courier/model/courier.model";

export enum Status {
  PENDING = "pending",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
  ON_THE_WAY = "on_the_way",
}

interface IProductOrdersCreationAttr {
  buyer_id: number;
  product_id: number;
  quantity: number;
  total_price: number;
  status: Status;
  delivery_address: string;
  phone_number: string;
  kuryer_id: number;
  delivery_status: Status;
}
@Table({tableName: "product-order"})
export class ProductOrder extends Model<ProductOrder, IProductOrdersCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Buyurtmaning unikal Idsi",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: 10,
    description: "Buyurtma soni",
  })
  @Column({
    type: DataType.INTEGER,
  })
  declare quantity: number;

  @ApiProperty({
    example: 200000.0,
    description: "Buyurtmaning umumiy narxi",
  })
  @Column({
    type: DataType.DECIMAL(15, 2),
  })
  declare total_price: number;

  @ApiProperty({
    example: "Cilonzor tumani Najot Ta'lim binosi..",
    description: "Mijoz manzili",
  })
  @Column({
    type: DataType.STRING,
  })
  declare delivery_address: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Mijoz telefon raqami",
  })
  @Column({
    type: DataType.STRING,
  })
  declare phone_number: string;

  @ApiProperty({
    example: "delivered",
    description: "Buyurtma holati",
  })
  @Column({
    type: DataType.ENUM(
      Status.CANCELLED,
      Status.DELIVERED,
      Status.PENDING,
      Status.SHIPPED
    ),
  })
  declare status: Status;

  @ApiProperty({
    example: "on_the_way",
    description: "Yetkazib berish holati",
  })
  @Column({
    type: DataType.ENUM(Status.ON_THE_WAY, Status.DELIVERED, Status.PENDING),
  })
  declare delivery_status: Status;

  @ApiProperty({
    example: 1,
    description: "Mijozning Id raqami",
  })
  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
  })
  declare buyer_id: number;

  @ApiProperty({
    example: 2,
    description: "Mahsulotning Id raqami",
  })
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
  })
  declare product_id: number;

  @ApiProperty({
    example: 1,
    description: "Yetkazib beruvchi Id raqami",
  })
  @ForeignKey(() => Courier)
  @Column({
    type: DataType.INTEGER,
  })
  declare kuryer_id: number;

  @BelongsTo(() => Users)
  buyer: Users;

  @BelongsTo(() => Product)
  product: Product;

  @BelongsTo(() => Courier)
  courier: Courier;
}
