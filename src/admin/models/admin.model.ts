import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "../../role/models/role.model";
import { AdminRole } from "../../admin-role/models/admin-role.model";

interface IAdminAttr{
    full_name: string;
    email: string;
    password: string;
    is_active: boolean;
}

@Table({ tableName: "admin", timestamps: true })
export class Admin extends Model<Admin, IAdminAttr> {
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
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING(50)
  })
  declare password: string

  @Column({
    type: DataType.BOOLEAN,
  })
  declare is_active: boolean;

  @BelongsToMany(()=> Role, ()=> AdminRole)
  roles: Role[];
}