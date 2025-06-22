import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

export enum VehicleType {
  BIKE = "bike",
  CAR = "car",
  SCOOTER = "scooter",
}

interface ICourierAttr {
  full_name: string;
  phone_number: string;
  vehicle_type: VehicleType;
  vehicle_plate_number: string;
  telegram_link: string;
  is_active: boolean;
}

@Table({ tableName: "courier", timestamps: true })
export class Courier extends Model<Courier, ICourierAttr> {
  @ApiProperty({
    example: 1,
    description: "Kuryerning unikal IDsi",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Vali Aliyev",
    description: "Kuryerning ism-familyasi",
  })
  @Column({
    type: DataType.STRING(50),
  })
  declare full_name: string;

  @ApiProperty({
    example: "+998911234567",
    description: "Kuryerning telefon raqami",
  })
  @Column({
    type: DataType.STRING(15),
    unique: true,
  })
  declare phone_number: string;

  @ApiProperty({
    example: "CAR",
    description: "Kuryerning transporti turi",
  })
  @Column({
    type: DataType.ENUM(VehicleType.BIKE, VehicleType.CAR, VehicleType.SCOOTER),
  })
  declare vehicle_type: VehicleType;

  @ApiProperty({
    example: "01|A123BC",
    description: "Kuryerning transport raqami",
  })
  @Column({
    type: DataType.STRING(15),
  })
  declare vehicle_plate_number: string;

  @ApiProperty({
    example: "@kuryer_tg_link",
    description: "Kuryerning telegram nickname yoki linki",
  })
  @Column({
    type: DataType.STRING,
  })
  declare telegram_link: string;

  @ApiProperty({
    example: false,
    description: "Kuryerning aktivligi",
  })
  @Column({
    type: DataType.BOOLEAN,
  })
  declare is_active: boolean;
}
