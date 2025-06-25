import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsString,
  IsStrongPassword,
} from "class-validator";

export enum UserRole {
  CREATOR = "creator",
  USER = "user",
}

export class CreateUserDto {
  @ApiProperty({
    example: "Ali Valiyev",
    description: "User ism-familyasi",
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    example: "ali@mail.uz",
    description: "User pochtasi",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: "Uzbek!$t0n",
    description: "User paroli",
  })
  @IsStrongPassword({ minLength: 6 })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: "creator | user",
    description: "User roli",
  })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;

  @ApiProperty({
    example: "Ism, familya, yosh va boshqalar..",
    description: "User haqida ma'lumot",
  })
  @IsString()
  bio: string;

  @ApiProperty({
    example: "avatar.jpg",
    description: "User profil rasmi urli",
  })
  @IsString()
  avatar_url: string;

  @ApiProperty({
    example: "banner.jpg",
    description: "User kanali rasmi urli",
  })
  @IsString()
  banner_url: string;
}
