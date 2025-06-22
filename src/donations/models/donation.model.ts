import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Users } from "../../users/models/user.model";
import { ApiProperty } from "@nestjs/swagger";

export enum PaymnetMethods {
  CLICK = "click",
  CARD = "card",
  PAYME = "payme",
  UZUM = "uzum",
  UZCARD = "uzcard",
  HUMO = "humo",
}
interface IDonationCreationAttr {
  supporter_id: number;
  creator_id: number;
  amount: number;
  message: string;
  payment_method: PaymnetMethods;
  is_anonymous: boolean;
}

@Table({ tableName: "donation" })
export class Donation extends Model<Donation, IDonationCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Donatning unikal id raqami",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: 100000.0,
    description: "Donat umumiy qiymati",
  })
  @Column({
    type: DataType.DECIMAL(15, 2),
    allowNull: false,
  })
  declare amount: number;

  @ApiProperty({
    example: "Omad👍",
    description: "Donat yuborayotgan user izohi",
  })
  @Column({
    type: DataType.STRING,
  })
  declare message: string;

  @ApiProperty({
    example: "click",
    description: "Donat yuborayotgan user to'lov usuli",
  })
  @Column({
    type: DataType.ENUM(
      PaymnetMethods.CARD,
      PaymnetMethods.CLICK,
      PaymnetMethods.HUMO,
      PaymnetMethods.PAYME,
      PaymnetMethods.UZCARD,
      PaymnetMethods.UZUM
    ),
  })
  declare payment_method: PaymnetMethods;

  @ApiProperty({
    example: true,
    description: "Donat yuborayotgan user anonym yoki anonym emasligi",
  })
  @Column({
    type: DataType.BOOLEAN,
  })
  declare is_anonymous: boolean;

  @ApiProperty({
    example: 2,
    description: "Donat yuborayotgan user Id raqami",
  })
  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER })
  declare supporter_id: number;

  @BelongsTo(() => Users, "supporter_id")
  supporter: Users;

  @ApiProperty({
    example: 2,
    description: "Donat qabul qilayotgan user Id raqami",
  })
  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER })
  declare creator_id: number;

  @BelongsTo(() => Users, "creator_id")
  creator: Users;
}
