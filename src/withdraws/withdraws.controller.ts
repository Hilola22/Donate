import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { WithdrawsService } from './withdraws.service';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';
import { UpdateWithdrawDto } from './dto/update-withdraw.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Withdraw } from './models/withdraw.model';

@ApiTags("Pulni yechib olish")
@Controller("withdraws")
export class WithdrawsController {
  constructor(private readonly withdrawsService: WithdrawsService) {}

  @ApiOperation({ summary: "Yangi 'pul yechib olish' shartnomasi qo'shish " })
  @ApiResponse({
    status: 201,
    description: "Yangi pul yechib olish shartnomasi qo'shildi",
    type: Withdraw,
  })
  @Post()
  create(@Body() createWithdrawDto: CreateWithdrawDto) {
    return this.withdrawsService.create(createWithdrawDto);
  }

  @ApiOperation({
    summary: "Barcha 'pul yechib olish' shartnomalarini ro'yxatini olish ",
  })
  @ApiResponse({
    status: 200,
    description: "Barcha shartnomalar: ",
    type: [Withdraw],
  })
  @Get()
  findAll() {
    return this.withdrawsService.findAll();
  }

  @ApiOperation({ summary: "Pul yechib olish shartnomasini Id orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Pul yechib olish shartnomasi: ",
    type: Withdraw,
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.withdrawsService.findOne(id);
  }

  @ApiOperation({
    summary: "Pul yechib olish shartnomasini Id orqali yangilash",
  })
  @ApiResponse({
    status: 200,
    description: "Pul yechib olish shartnomasi yangilandi!",
    type: Withdraw,
  })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateWithdrawDto: UpdateWithdrawDto
  ) {
    return this.withdrawsService.update(id, updateWithdrawDto);
  }

  @ApiOperation({ summary: "Pul yechib olish shartnomasini Id orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Pul yechib olish shartnomasi o'chirildi!",
    type: Withdraw,
  })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.withdrawsService.remove(id);
  }
}