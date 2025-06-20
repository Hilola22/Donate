import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { CreatorSocial } from "../../creator-social/models/creator-social.model";

interface ISocialAttr{
    name: string;
    social_icon: string;
}

@Table({ tableName: "social", timestamps: true })
export class Social extends Model<Social, ISocialAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  declare social_icon: string;

  @HasMany(() => CreatorSocial, "social_id")
  creatorLinks: CreatorSocial[];
}