import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Notifications } from "../../notifications/models/notification.model";
import { Donation } from "../../donations/models/donation.model";
import { CreatorSocial } from "../../creator-social/models/creator-social.model";
import { Product } from "../../products/models/product.model";
import { ApiProperty } from "@nestjs/swagger";
import { ProductOrder } from "../../product-orders/models/product-order.model";

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

  @ApiProperty({
    example: "Ali Valiyev",
    description: "User ism-familyasi",
  })
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare full_name: string;

  @ApiProperty({
    example: "ali@mail.uz",
    description: "User pochtasi",
  })
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare email: string;

  @ApiProperty({
    example: "Uzbek!$t0n",
    description: "User paroli",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @ApiProperty({
    example: "Ism, familya, yosh va boshqalar..",
    description: "User haqida ma'lumot",
  })
  @Column({
    type: DataType.STRING,
  })
  declare bio: string;

  @ApiProperty({
    example: "avatar.jpg",
    description: "User profil rasmi urli",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare avatar_url: string;

  @ApiProperty({
    example: "creator | user",
    description: "User roli",
  })
  @Column({
    type: DataType.ENUM(UserRole.CREATOR, UserRole.USER),
  })
  declare role: UserRole;

  @ApiProperty({
    example: "banner.jpg",
    description: "User kanali rasmi urli",
  })
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

  @HasMany(() => CreatorSocial, "social_id")
  socialLinks: CreatorSocial[];

  @HasMany(() => Product, "creator_id")
  products: Product[];

  @HasMany(() => ProductOrder)
  orders: ProductOrder[];
}
