import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsEnum,
  IsPhoneNumber,
  IsString,
} from "class-validator";

export enum VehicleType {
  BIKE = "bike",
  CAR = "car",
  SCOOTER = "scooter",
}

export class CreateCourierDto {
  @ApiProperty({
    example: "Ali Valiyev",
    description: "Kuryer ism-familyasi",
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    example: "+998911234567",
    description: "Kuryer telefon raqami",
  })
  @IsPhoneNumber("UZ")
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({
    example: "CAR",
    description: "Kuryerning transporti turi",
  })
  @IsEnum(VehicleType)
  vehicle_type: VehicleType;

  @ApiProperty({
    example: "01|A123BC",
    description: "Kuryer transportining raqami",
  })
  @IsString()
  vehicle_plate_number: string;

  @ApiProperty({
    example: "@kuryer_tg_link",
    description: "Kuryerning telegram 'nickname'i",
  })
  @IsString()
  telegram_link: string;

  @ApiProperty({
    example: false,
    description: "Kuryerning aktivligi",
  })
  @IsBoolean()
  is_active: boolean;
}
