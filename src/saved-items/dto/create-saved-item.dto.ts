import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateSavedItemDto {
  @ApiProperty({
    example: 1,
    description: "Foydalanuvchining Id raqami",
  })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({
    example: 1,
    description: "Mahsulotning Id raqami",
  })
  @IsNumber()
  @IsNotEmpty()
  product_id: number;
}
