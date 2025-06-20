import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Users } from "../../users/models/user.model";

interface INotificationCreationAttr{
    userId: number;
    message: string;
}

@Table({tableName: "notifications"})
export class Notifications extends Model<Notifications, INotificationCreationAttr>{
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
      declare message: string;

      @ForeignKey(()=> Users)
      @Column({
        type: DataType.INTEGER
      })
      declare userId: number;

      @BelongsTo(()=>Users)
      users: Users;
}
