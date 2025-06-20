import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Users } from "../../users/models/user.model";
import { Social } from "../../social/models/social.model";

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
  @Column({
    type: DataType.STRING,
  })
  declare url: string;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
  })
  declare creator_id: number;

  @BelongsTo(() => Users)
  creator: Users;

  @ForeignKey(() => Social)
  @Column({ type: DataType.INTEGER })
  declare social_id: number;

  @BelongsTo(() => Social)
  social: Social;
}
