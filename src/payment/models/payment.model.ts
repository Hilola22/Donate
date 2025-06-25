import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ProductOrder } from "../../product-orders/models/product-order.model";
import { Users } from "../../users/models/user.model";

export enum Payments {
  CASH = "cash",
  CARD = "card",
}

export enum Status {
  PENDING = "pending",
  CANCELLED = "cancelled",
  SUCCESS = "success",
}

interface IPaymentCreationAttr {
  order_id: number;
  user_id: number;
  payment_method: Payments;
  status: Status;
  paid_at: Date;
}

@Table({ tableName: "payment" })
export class Payment extends Model<Payment, IPaymentCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "To'lovning unikal Id raqami",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "card",
    description: "To'lov turi",
  })
  @Column({
    type: DataType.ENUM(Payments.CARD, Payments.CASH),
  })
  declare payment_method: Payments;

  @ApiProperty({
    example: "pending",
    description: "To'lov holati",
  })
  @Column({
    type: DataType.ENUM(Status.SUCCESS, Status.PENDING, Status.CANCELLED),
  })
  declare status: Status;

  @ApiProperty({
    example: "2025-06-24",
    description: "To'lov qilingan sana",
  })
  @Column({
    type: DataType.DATEONLY,
  })
  declare paid_at: Date;

  @ApiProperty({
    example: 1,
    description: "Buyurtmaning Id raqami",
  })
  @ForeignKey(() => ProductOrder)
  @Column({
    type: DataType.INTEGER,
  })
  declare order_id: number;

  @ApiProperty({
    example: 1,
    description: "Mijozning Id raqami",
  })
  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
  })
  declare user_id: number;

  @BelongsTo(() => Users)
  user: Users;

  @BelongsTo(() => ProductOrder)
  order: ProductOrder;
}
