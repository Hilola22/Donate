import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSocialDto {
  @ApiProperty({
    example: "instagram",
    description: "Ijtimoiy tarmoq nomi",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "instagram_icon.png",
    description: "Ijtimoiy tarmoq ikonkasi",
  })
  @IsString()
  @IsNotEmpty()
  social_icon: string;
}
