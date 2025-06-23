import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { CreatorSocial } from "../../creator-social/models/creator-social.model";
import { ApiProperty } from "@nestjs/swagger";

interface ISocialAttr {
  name: string;
  social_icon: string;
}

@Table({ tableName: "social", timestamps: true })
export class Social extends Model<Social, ISocialAttr> {
  @ApiProperty({
    example: 1,
    description: "Ijtimoiy tarmoqning unikal Idsi",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "instagram",
    description: "Ijtimoiy tarmoq nomi",
  })
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare name: string;

  @ApiProperty({
    example: "instagram_icon.png",
    description: "Ijtimoiy tarmoq ikonkasi",
  })
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  declare social_icon: string;

  @HasMany(() => CreatorSocial, "social_id")
  creatorLinks: CreatorSocial[];
}
