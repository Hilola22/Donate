import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCreatorStatisticDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  creator_id: number;

  @ApiProperty({ example: 1000000 })
  @IsNumber()
  total_donations: number;

  @ApiProperty({ example: 50 })
  @IsNumber()
  total_supporters: number;
}
