import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateAdminRoleDto {
  @ApiProperty({
    example: 1,
    description: "Admin rolining IDsi",
  })
  @IsNumber()
  @IsNotEmpty()
  role_id: number;

  @ApiProperty({
    example: 1,
    description: "Admin IDsi",
  })
  @IsNumber()
  @IsNotEmpty()
  admin_id: number;
}
