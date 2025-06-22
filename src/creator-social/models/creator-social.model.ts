import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Users } from "../../users/models/user.model";
import { Social } from "../../social/models/social.model";
import { ApiProperty } from "@nestjs/swagger";

interface ICreatorSocialCreationAttr{
    creator_id: number;
    social_id: number;
    url: string;
}

@Table({ tableName: "creator-social" })
export class CreatorSocial extends Model<
  CreatorSocial,
  ICreatorSocialCreationAttr
> {
  @ApiProperty({
    example: "about.url",
    description: "Creator-userning ijtimoiy tarmoq urli bo'lishi mumkin",
  })
  @Column({
    type: DataType.STRING,
  })
  declare url: string;

  @ApiProperty({
    example: 1,
    description: "Creator-userning id raqami",
  })
  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
  })
  declare creator_id: number;

  @BelongsTo(() => Users)
  creator: Users;

  @ApiProperty({
    example: 1,
    description: "Creator-userning social id raqami",
  })
  @ForeignKey(() => Social)
  @Column({ type: DataType.INTEGER })
  declare social_id: number;

  @BelongsTo(() => Social)
  social: Social;
}
