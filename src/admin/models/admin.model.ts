import { Column, DataType, Model, Table } from "sequelize-typescript";

export enum AdminRoles {
    ADMIN = 'admin',
    SUPERADMIN = 'superadmin',
    CREATORADMIN = 'creatoradmin',
}

interface IAdminAttr{
    full_name: string;
    email: string;
    role: AdminRoles;
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
    type: DataType.ENUM("admin", "superadmin", "creatoradmin"),
  })
  declare role: AdminRoles;

  @Column({
    type: DataType.STRING(50)
  })
  declare password: string

  @Column({
    type: DataType.BOOLEAN,
  })
  declare is_active: boolean;
}