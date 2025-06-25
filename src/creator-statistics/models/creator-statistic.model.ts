import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Users } from "../../users/models/user.model";

interface ICreatorStatisticsCreationAttr {
  creator_id: number;
  total_donations: number;
  total_supporters: number;
}

@Table({ tableName: "creator-statistics" })
export class CreatorStatistic extends Model<
  CreatorStatistic,
  ICreatorStatisticsCreationAttr
> {
  @ApiProperty({ example: 1, description: "Statistikaning unikal Idsi" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: 1, description: "Creator Idsi" })
  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER })
  declare creator_id: number;

  @ApiProperty({ example: 1000000, description: "Jami donationlar summasi" })
  @Column({ type: DataType.INTEGER })
  declare total_donations: number;

  @ApiProperty({ example: 50, description: "Jami supporterlar soni" })
  @Column({ type: DataType.INTEGER })
  declare total_supporters: number;

  @BelongsTo(() => Users)
  creator: Users;
}
