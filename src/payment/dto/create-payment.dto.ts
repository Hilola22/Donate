import { ApiProperty } from "@nestjs/swagger";
import { Payments, Status } from "../models/payment.model";
import { IsDateString, IsEnum, IsNotEmpty, IsNumber } from "class-validator";

export class CreatePaymentDto {
  @ApiProperty({
    example: 1,
    description: "Buyurtmaning Id raqami",
  })
  @IsNumber()
  @IsNotEmpty()
  order_id: number;

  @ApiProperty({
    example: 1,
    description: "Mijozning Id raqami",
  })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({
    example: "card",
    description: "To'lov turi",
  })
  @IsEnum(Payments)
  payment_method: Payments;

  @ApiProperty({
    example: "pending",
    description: "To'lov holati",
  })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({
    example: "2025-06-24",
    description: "To'lov qilingan sana",
  })
  @IsDateString()
  paid_at: Date;
}
