import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { Role } from "../../role/models/role.model";
import { AdminRole } from "../../admin-role/models/admin-role.model";
import { ApiProperty } from "@nestjs/swagger";

interface IAdminAttr {
  full_name: string;
  email: string;
  password: string;
  is_active: boolean;
}

@Table({ tableName: "admin", timestamps: true })
export class Admin extends Model<Admin, IAdminAttr> {
  @ApiProperty({
    example: 1,
    description: "Adminning unikal id raqami",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Ali Valiyev",
    description: "Adminning ism-familyasi",
  })
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare full_name: string;

  @ApiProperty({
    example: "admin@mail.uz",
    description: "Adminni pochatsi",
  })
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @ApiProperty({
    example: "Uzbek1$t0n",
    description: "Admin paroli",
  })
  @Column({
    type: DataType.STRING(50),
  })
  declare password: string;

  @ApiProperty({
    example: "false",
    description: "Adminni activligi",
  })
  @Column({
    type: DataType.BOOLEAN,
  })
  declare is_active: boolean;

  @BelongsToMany(() => Role, () => AdminRole)
  roles: Role[];
}
