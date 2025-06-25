import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateProductReviewDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  order_id: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  product_id: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ example: 5 })
  @IsInt()
  @IsNotEmpty()
  reting: number;

  @ApiProperty({ example: "Yaxshi mahsulot" })
  @IsString()
  comment: string;
}
