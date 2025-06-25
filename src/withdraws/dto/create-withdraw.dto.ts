import { ApiProperty } from "@nestjs/swagger";

enum status {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}
export class CreateWithdrawDto {
  @ApiProperty({
    example: 1,
    description: "To'lovni amalga oshirayotgan user Idsi",
  })
  creatorId: number;

  @ApiProperty({
    example: 150.0,
    description: "Yechib olinadigan umumiy summa",
  })
  amount: number;

  @ApiProperty({
    example: "pending",
    enum: status,
    description: "Pulni yechib olish holati",
  })
  status: status;

  @ApiProperty({
    example: "2%",
    description: "Saytning xizmat haqqi",
  })
  site_fee: string;
}
