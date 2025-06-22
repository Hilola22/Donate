import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Users } from "../../users/models/user.model";
import { ApiProperty } from "@nestjs/swagger";

interface INotificationCreationAttr{
    userId: number;
    message: string;
}

@Table({ tableName: "notifications" })
export class Notifications extends Model<
  Notifications,
  INotificationCreationAttr
> {
  @ApiProperty({
    example: 1,
    description: "Xabarning unical IDsi",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Hammasi ajoyib👍",
    description: "Userning xabarnomasi",
  })
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare message: string;

  @ApiProperty({
    example: 1,
    description: "User IDsi",
  })
  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
  })
  declare userId: number;

  @BelongsTo(() => Users)
  users: Users;
}
