import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from "class-validator";

export class CreateAdminDto {
  @ApiProperty({
    example: "Ali Valiyev",
    description: "Admin ism-familyasi",
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    example: "ali@mail.uz",
    description: "Admin pochtasi",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: "Uzbek!$t0n",
    description: "Admin paroli",
  })
  @IsStrongPassword({ minLength: 6 })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: "true",
    description: "Admin activeligi",
  })
  @IsBoolean()
  is_active: boolean;
}
