import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { Admin } from "../../admin/models/admin.model";
import { AdminRole } from "../../admin-role/models/admin-role.model";
import { ApiProperty } from "@nestjs/swagger";

interface IRoleCreationAttr {
  name: string;
  description: string;
}

@Table({ tableName: "role" })
export class Role extends Model<Role, IRoleCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Rolning unikal Idsi"
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "admin",
    description: "User roli",
  })
  @Column({
    type: DataType.STRING(50),
  })
  declare name: string;

  @ApiProperty({
    example: "Bu admin role",
    description: "User roli haqida izoh",
  })
  @Column({
    type: DataType.STRING(50),
  })
  declare description: string;

  @BelongsToMany(() => Admin, () => AdminRole)
  admins: Admin[];
}
