import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({
    example: "admin",
    description: "User roli",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "Bu admin role",
    description: "User roli haqida izoh",
  })
  @IsString()
  description: string;
}
