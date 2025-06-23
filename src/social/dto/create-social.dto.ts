import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsString } from "class-validator";

export class CreateSocialDto {
  @ApiProperty({
    example: "instagram",
    description: "Ijtimoiy tarmoq nomi",
  })
  @IsString()
  @IsEmpty()
  name: string;

  @ApiProperty({
    example: "instagram_icon.png",
    description: "Ijtimoiy tarmoq ikonkasi",
  })
  @IsString()
  @IsEmpty()
  social_icon: string;
}
