import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCreatorSocialDto {
  @ApiProperty({
    example: 1,
    description: "Creator user id raqami",
  })
  @IsNumber()
  @IsNotEmpty()
  creator_id: number;

  @ApiProperty({
    example: 1,
    description: "Creator userning social id raqami",
  })
  @IsNumber()
  @IsNotEmpty()
  social_id: number;

  @ApiProperty({
    example: "about.url",
    description: "Url joylashtiring",
  })
  @IsString()
  url: string;
}
