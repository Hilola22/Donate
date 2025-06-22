import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNumber, IsString } from "class-validator";

export class CreateCreatorSocialDto {
  @ApiProperty({
    example: 1,
    description: "Creator user id raqami",
  })
  @IsNumber()
  @IsEmpty()
  creator_id: number;

  @ApiProperty({
    example: 1,
    description: "Creator userning social id raqami",
  })
  @IsNumber()
  @IsEmpty()
  social_id: number;

  @ApiProperty({
    example: "about.url",
    description: "Url joylashtiring",
  })
  @IsString()
  url: string;
}
