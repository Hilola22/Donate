import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({
    example: "Futbolka",
    description: "Mahsulot kategoriya nomi",
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
