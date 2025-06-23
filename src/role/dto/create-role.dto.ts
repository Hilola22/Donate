import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsString } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({
    example: "admin",
    description: "User roli",
  })
  @IsString()
  @IsEmpty()
  name: string;

  @ApiProperty({
    example: "Bu admin role",
    description: "User roli haqida izoh",
  })
  @IsString()
  description: string;
}
