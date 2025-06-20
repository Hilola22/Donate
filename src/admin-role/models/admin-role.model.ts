import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Admin } from "../../admin/models/admin.model";
import { Role } from "../../role/models/role.model";

interface IAdminRoleCreationAttr{
    role_id: number;
    admin_id: number;
}

@Table({ tableName: "admin-role" })
export class AdminRole extends Model<AdminRole, IAdminRoleCreationAttr> {
  @ForeignKey(() => Admin)
  @Column({
    type: DataType.INTEGER,
  })
  declare admin_id: number;

  @BelongsTo(() => Admin)
  admin: Admin;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
  })
  declare role_id: number;

  @BelongsTo(() => Role)
  role: Role;
}
