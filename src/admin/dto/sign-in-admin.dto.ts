import { ApiProperty } from "@nestjs/swagger";

export class SignInAdminDto {
  @ApiProperty({
    example: "uadmin!@mail.uz",
    description: "Admin pochtasi",
  })
  readonly email: string;

  @ApiProperty({
    example: "Uzbek1$0n",
    description: "Admin paroli",
  })
  readonly password: string;
}
