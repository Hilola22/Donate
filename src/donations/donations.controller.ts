import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Donation } from './models/donation.model';

@ApiTags("Donatlar")
@Controller("donations")
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @ApiOperation({ summary: "Yangi donat yaratish" })
  @ApiResponse({
    status: 201,
    description: "Yangi donat qo'shildi",
    type: Donation,
  })
  @Post()
  create(@Body() createDonationDto: CreateDonationDto) {
    return this.donationsService.create(createDonationDto);
  }

  @ApiOperation({ summary: "Barcha donatlar ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha donatlar: ",
    type: [Donation],
  })
  @Get()
  findAll() {
    return this.donationsService.findAll();
  }

  @ApiOperation({ summary: "Donat ma'lumotlarini ID orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Donat: ",
    type: Donation,
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.donationsService.findOne(id);
  }

  @ApiOperation({ summary: "Donat ma'umotlarini ID orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "Donat ma'umotlari yangilandi! ",
    type: Donation,
  })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateDonationDto: UpdateDonationDto
  ) {
    return this.donationsService.update(id, updateDonationDto);
  }

  @ApiOperation({ summary: "Donat ma'umotlarini ID orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Donat ma'umotlari o'chirildi! ",
    type: Donation,
  })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.donationsService.remove(id);
  }
}
