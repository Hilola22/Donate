import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

export class CreateProductDto {
  @ApiProperty({
    example: "Uzbek brendi",
    description: "Mahsulot nomi",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "",
    description: "Mahsulot haqida: 100% paxta tolasidan tayyorlangan",
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: "Futbolka",
    description: "Mahsulot kategoriya nomi",
  })
  @IsNumber()
  in_stock: number;

  @ApiProperty({
    example: 150000.0,
    description: "Mahsulot narxi",
  })
  @IsDecimal()
  price: number;

  @ApiProperty({
    example: true,
    description: "Mahsulot mavjudligi, sotuvda borligi",
  })
  @IsBoolean()
  is_available: boolean;

  @ApiProperty({
    example: 1,
    description: "Mahsulotni egasi, userning Id raqami",
  })
  @IsNumber()
  @IsNotEmpty()
  creator_id: number;

  @ApiProperty({
    example: 1,
    description: "Mahsulotni kategoriyasi Id raqami",
  })
  @IsNumber()
  @IsNotEmpty()
  category_id: number;
}
