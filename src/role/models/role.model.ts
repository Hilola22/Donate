import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Admin } from "../../admin/models/admin.model";
import { AdminRole } from "../../admin-role/models/admin-role.model";

interface IRoleCreationAttr{
    name: string;
    description: string;
}

@Table({tableName: "role"})
export class Role extends Model<Role,  IRoleCreationAttr>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;

    @Column({
        type: DataType.STRING(50),
    })
    declare name: string;

    @Column({
        type: DataType.STRING(50),
    })
    declare description: string;

    @BelongsToMany(()=> Admin, ()=> AdminRole)
    admins: Admin[];
}
