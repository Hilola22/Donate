import { Column, DataType, Model, Table } from "sequelize-typescript";


interface ICategoryAttr{
    name: string;
}

@Table({tableName: "category", timestamps: true})
export class Category extends Model<Category, ICategoryAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number;
    @Column({
        type: DataType.STRING(50),
        allowNull: false,
        unique: true
    })
    declare name: string;
}