import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Admin } from "../../admin/models/admin.model";
import { Role } from "../../role/models/role.model";
import { ApiProperty } from "@nestjs/swagger";

interface IAdminRoleCreationAttr{
    role_id: number;
    admin_id: number;
}

@Table({ tableName: "admin-role" })
export class AdminRole extends Model<AdminRole, IAdminRoleCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Adminning IDsi",
  })
  @ForeignKey(() => Admin)
  @Column({
    type: DataType.INTEGER,
  })
  declare admin_id: number;

  @BelongsTo(() => Admin)
  admin: Admin;

  @ApiProperty({
    example: 1,
    description: "Admin rolining IDsi",
  })
  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
  })
  declare role_id: number;

  @BelongsTo(() => Role)
  role: Role;
}
