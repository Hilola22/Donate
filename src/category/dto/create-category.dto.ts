import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({
    example: "Futbolka",
    description: "Mahsulot kategoriya nomi"
  })
  @IsString()
  @IsEmpty()
  name: string;
}