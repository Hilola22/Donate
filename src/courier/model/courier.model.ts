import { Column, DataType, Model, Table } from "sequelize-typescript";

export enum VehicleType {
    BIKE = 'bike',
    CAR = 'car',
    SCOOTER = 'scooter',
}

interface ICourierAttr{
    full_name: string;
    phone_number: string;
    vehicle_type: VehicleType,
    vehicle_plate_number: string,
    telegram_link: string,
    is_active: boolean
}

@Table({ tableName: "courier", timestamps: true })
export class Courier extends Model<Courier, ICourierAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
  })
  declare full_name: string;

  @Column({
    type: DataType.STRING(15),
    unique: true,
  })
  declare phone_number: string;

  @Column({
    type: DataType.ENUM("bike", "car", "scooter"),
  })
  declare vehicle_type: VehicleType;

  @Column({
    type: DataType.STRING(15),
  })
  declare vehicle_plate_number: string;

  @Column({
    type: DataType.STRING,
  })
  declare telegram_link: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare is_active: boolean;
}