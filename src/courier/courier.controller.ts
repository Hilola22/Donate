import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { UpdateCourierDto } from "./dto/update-courier.dto";
import { CreateCourierDto } from "./dto/create-courier.dto";
import { Courier } from "./model/courier.model";
import { CourierService } from "./courier.service";


@Controller("courier")
export class CourierController {
  constructor(private readonly courierService: CourierService) {}

  @Post()
  async createCourier(
    @Body() createCourierDto: CreateCourierDto
  ): Promise<Courier> {
    return this.courierService.createCourier(createCourierDto);
  }

  @Get()
  async getAllCouriers(): Promise<Courier[]> {
    return this.courierService.getAllCouriers();
  }

  @Get(":id")
  async getCourierById(@Param("id") id: number): Promise<Courier | null> {
    return this.courierService.getCourierById(id);
  }

  @Get()
  async findByCourierName(@Query("full_name") name: string) {
    return this.courierService.findByCourierName(name);
  }

  @Patch(":id")
  async updateCourier(
    @Param("id") id: number,
    @Body() updateCourierDto: UpdateCourierDto
  ) {
    return this.courierService.updateCourier(id, updateCourierDto);
  }

  @Delete(":id")
  async deleteCourier(@Param("id") id: number): Promise<string> {
    return this.courierService.deleteCourier(id);
  }
}