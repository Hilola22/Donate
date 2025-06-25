import { ApiProperty } from "@nestjs/swagger";
import { Status } from "../models/product-order.model";
import {
  IsEnum,
  IsNumber,
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
} from "class-validator";

export class CreateProductOrderDto {
  @ApiProperty({
    example: 1,
    description: "Mijozning Id raqami",
  })
  @IsNumber()
  @IsNotEmpty()
  buyer_id: number;

  @ApiProperty({
    example: 2,
    description: "Mahsulotning Id raqami",
  })
  @IsNumber()
  @IsNotEmpty()
  product_id: number;

  @ApiProperty({
    example: 10,
    description: "Buyurtma soni",
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    example: 200000.0,
    description: "Buyurtmaning umumiy narxi",
  })
  @IsNumber()
  total_price: number;

  @ApiProperty({
    example: "pending",
    description: "Buyurtma holati",
    enum: Status,
  })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({
    example: "Cilonzor tumani Najot Ta'lim binosi..",
    description: "Mijoz manzili",
  })
  @IsString()
  delivery_address: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Mijoz telefon raqami",
  })
  @IsString()
  phone_number: string;

  @ApiProperty({
    example: 1,
    description: "Yetkazib beruvchi Id raqami",
  })
  @IsNumber()
  @IsNotEmpty()
  kuryer_id: number;

  @ApiProperty({
    example: "on_the_way",
    description: "Yetkazib berish holati",
    enum: Status,
  })
  @IsEnum(Status)
  delivery_status: Status;
}
