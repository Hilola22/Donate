import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { UpdateCourierDto } from "./dto/update-courier.dto";
import { CreateCourierDto } from "./dto/create-courier.dto";
import { Courier } from "./model/courier.model";
import { CourierService } from "./courier.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Kuryerlar")
@Controller("courier")
export class CourierController {
  constructor(private readonly courierService: CourierService) {}

  @ApiOperation({ summary: "Yangi kuryer qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi kuryer qo'shildi",
    type: Courier,
  })
  @Post()
  async createCourier(
    @Body() createCourierDto: CreateCourierDto
  ): Promise<Courier> {
    return this.courierService.createCourier(createCourierDto);
  }

  @ApiOperation({ summary: "Barcha kuryerlar ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha kuryerlar: ",
    type: [Courier],
  })
  @Get()
  async getAllCouriers(): Promise<Courier[]> {
    return this.courierService.getAllCouriers();
  }

  @ApiOperation({ summary: "Kuryerni ID orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Kuryer: ",
    type: Courier,
  })
  @Get(":id")
  async getCourierById(
    @Param("id", ParseIntPipe) id: number
  ): Promise<Courier | null> {
    return this.courierService.getCourierById(id);
  }

  @ApiOperation({ summary: "Kuryerni ismi orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Kuryer: ",
    type: Courier,
  })
  @Get()
  async findByCourierName(@Query("full_name") name: string) {
    return this.courierService.findByCourierName(name);
  }

  @ApiOperation({ summary: "Kuryer ma'lumotlarini ID orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "Kuryer ma'lumotlari yangilandi",
    type: Courier,
  })
  @Patch(":id")
  async updateCourier(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateCourierDto: UpdateCourierDto
  ) {
    return this.courierService.updateCourier(id, updateCourierDto);
  }

  @ApiOperation({ summary: "Kuryer ma'lumotlarini ID orqali o'chirish" })
  @ApiResponse({
    status: 201,
    description: "Kuryer o'chirildi",
    type: Courier,
  })
  @Delete(":id")
  async deleteCourier(@Param("id") id: number): Promise<string> {
    return this.courierService.deleteCourier(id);
  }
}