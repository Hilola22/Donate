import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Notifications } from "../../notifications/models/notification.model";
import { Donation } from "../../donations/models/donation.model";
import { CreatorSocial } from "../../creator-social/models/creator-social.model";

export enum UserRole {
  CREATOR = "creator",
  USER = "user",
}

interface IUserCreationAttr {
  full_name: string;
  email: string;
  password: string;
  role: UserRole;
  bio: string;
  avatar_url: string;
  banner_url: string;
}

@Table({ tableName: "user" })
export class Users extends Model<Users, IUserCreationAttr> {
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
  declare full_name: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
  })
  declare bio: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare avatar_url: string;

  @Column({
    type: DataType.ENUM(UserRole.CREATOR, UserRole.USER),
  })
  declare role: UserRole;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare banner_url: string;

  @HasMany(() => Notifications)
  notifications: Notifications[];

  @HasMany(() => Donation, "supporter_id")
  supportedDonations: Donation[];

  @HasMany(() => Donation, "creator_id")
  createdDonations: Donation[];

  @HasMany(()=> CreatorSocial, "social_id")
  socialLinks: CreatorSocial[];
}
