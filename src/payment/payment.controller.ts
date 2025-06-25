import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Payment } from './models/payment.model';

@ApiTags("To'lovlar")
@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: "Yangi to'lov qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi to'lov qo'shildi!",
    type: Payment,
  })
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @ApiOperation({ summary: "Barcha to'lovlar ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha to'lovlar: ",
    type: [Payment],
  })
  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @ApiOperation({ summary: "To'lovni Id orqali olish" })
  @ApiResponse({
    status: 200,
    description: "To'lov haqida:  ",
    type: Payment,
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.paymentService.findOne(id);
  }

  @ApiOperation({ summary: "To'lov ma'lumotlarini Id orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "To'lov ma'lumotlari yangilandi!",
    type: Payment,
  })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updatePaymentDto: UpdatePaymentDto
  ) {
    return this.paymentService.update(id, updatePaymentDto);
  }

  @ApiOperation({ summary: "To'lov ma'lumotlarini Id orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "To'lov ma'lumotlari o'chirildi!",
    type: Payment,
  })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.paymentService.remove(id);
  }
}
