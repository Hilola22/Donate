import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDecimal, IsEmpty, IsEnum, IsNumber, IsString } from "class-validator";

export enum PaymnetMethods {
  CLICK = "click",
  CARD = "card",
  PAYME = "payme",
  UZUM = "uzum",
  UZCARD = "uzcard",
  HUMO = "humo",
}

export class CreateDonationDto {
  @ApiProperty({
    example: 2,
    description: "Donat yuborayotgan user Id raqami",
  })
  @IsNumber()
  @IsEmpty()
  supporter_id: number;

  @ApiProperty({
    example: 2,
    description: "Donat qabul qilayotgan user Id raqami",
  })
  @IsNumber()
  @IsEmpty()
  creator_id: number;

  @ApiProperty({
    example: 100000.0,
    description: "Donat umumiy qiymati",
  })
  @IsDecimal()
  amount: number;

  @ApiProperty({
    example: "Ishlaringizga omad!",
    description: "Donat yuborayotgan user izohi",
  })
  @IsString()
  message: string;

  @ApiProperty({
    example: "payme",
    description: "Donat yuborayotgan userning to'lov usuli",
  })
  @IsEnum(PaymnetMethods)
  payment_method: PaymnetMethods;

  @ApiProperty({
    example: true,
    description: "Donat yuborayotgan user anonym yoki anonym emasligi",
  })
  @IsBoolean()
  is_anonymous: boolean;
}
