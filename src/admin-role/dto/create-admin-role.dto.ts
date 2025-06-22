import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNumber } from "class-validator";

export class CreateAdminRoleDto {
  @ApiProperty({
    example: 1,
    description: "Admin rolining IDsi",
  })
  @IsNumber()
  @IsEmpty()
  role_id: number;

  @ApiProperty({
    example: 1,
    description: "Admin IDsi",
  })
  @IsNumber()
  @IsEmpty()
  admin_id: number;
}
