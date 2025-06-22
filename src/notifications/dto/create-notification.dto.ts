import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNumber, IsString } from "class-validator";

export class CreateNotificationDto {
  @ApiProperty({
    example: 1,
    description: "User IDsi",
  })
  @IsNumber()
  @IsEmpty()
  userId: number;

  @ApiProperty({
    example: "Hammasi ajoyib👍",
    description: "Userning xabarnomasi",
  })
  @IsString()
  message: string;
}
