import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductImageDto {
  @ApiProperty({
    example: 1,
    description: "Mahsulot IDsi",
  })
  @IsNumber()
  @IsEmpty()
  product_id: number;

  @ApiProperty({
    example: "image.url",
    description: "Mahsulot rasmining urlni joylashtiring",
  })
  @IsString()
  @IsEmpty()
  image_url: string;

  @ApiProperty({
    example: true,
    description: "Asosiy rasm belgilash",
  })
  @IsBoolean()
  is_main: boolean;
}
