import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateNotificationDto {
  @ApiProperty({
    example: 1,
    description: "User IDsi",
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: "Hammasi ajoyib👍",
    description: "Userning xabarnomasi",
  })
  @IsString()
  message: string;
}
