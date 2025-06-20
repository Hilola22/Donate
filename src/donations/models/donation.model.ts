import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Users } from "../../users/models/user.model";

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
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.DECIMAL(15, 2),
    allowNull: false,
  })
  declare amount: number;

  @Column({
    type: DataType.STRING,
  })
  declare message: string;

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

  @Column({
    type: DataType.BOOLEAN,
  })
  declare is_anonymous: boolean;

  @ForeignKey(() => Users)
  @Column({type: DataType.INTEGER,})
  declare supporter_id: number;

  @BelongsTo(() => Users, "supporter_id")
  supporter: Users;

  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER })
  declare creator_id: number;
  
  @BelongsTo(() => Users, "creator_id")
  creator: Users;
}
