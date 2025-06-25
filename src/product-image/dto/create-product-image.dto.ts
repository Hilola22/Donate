import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductImageDto {
  @ApiProperty({
    example: 1,
    description: "Mahsulot IDsi",
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  product_id: number;

  @ApiProperty({
    example: "image.url",
    description: "Mahsulot rasmining urlni joylashtiring",
  })
  @IsString()
  @IsNotEmpty()
  image_url: string;

  @ApiProperty({
    example: true,
    description: "Asosiy rasm belgilash",
  })
  @IsBoolean()
  is_main: boolean;
}
