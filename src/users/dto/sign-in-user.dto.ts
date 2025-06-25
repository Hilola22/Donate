import { ApiProperty } from "@nestjs/swagger";

export class SignInUserDto {
  @ApiProperty({
    example: "user1@mail.uz",
    description: "Foydalanuvchini emaili",
  })
  readonly email: string;

  @ApiProperty({
    example: "Uzbek1$0n",
    description: "Foydalanuvchini paroli",
  })
  readonly password: string;
}
