import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

enum status {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

interface IWithdrawCreationAttr {
  creatorId: number;
  amount: number;
  status: status;
  site_fee: string;
}

@Table({tableName: "withdraw"})
export class Withdraw extends Model<Withdraw, IWithdrawCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Pulni yechib olishning unikal Idsi",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: 150.0,
    description: "Yechib olinadigan umumiy summa",
  })
  @Column({
    type: DataType.DECIMAL(15, 2),
  })
  declare amount: number;

  @ApiProperty({
    example: "pending",
    description: "Pulni yechib olish holati",
  })
  @Column({
    type: DataType.ENUM(status.APPROVED, status.PENDING, status.REJECTED),
  })
  declare status: status;

  @ApiProperty({
    example: "2%",
    description: "Saytning xizmat haqqi",
  })
  @Column({
    type: DataType.STRING,
  })
  declare site_fee: string;

  @ApiProperty({
    example: 1,
    description: "To'lovni amalga oshirayotgan user Idsi",
  })
  @Column({
    type: DataType.INTEGER,
  })
  declare creatorId: number;
}
