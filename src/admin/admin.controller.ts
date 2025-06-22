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
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { Admin } from "./models/admin.model";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";


@ApiTags("Adminlar")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: "Yangi admin qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi admin qo'shildi",
    type: Admin,
  })
  @Post()
  async createAdmin(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return this.adminService.createAdmin(createAdminDto);
  }

  @ApiOperation({ summary: "Barcha adminlar ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Adminlar: ",
    type: [Admin],
  })
  @Get()
  async getAllAdmins(): Promise<Admin[]> {
    return this.adminService.getAllAdmins();
  }

  @ApiOperation({ summary: "Admin ma'lumotlarini id orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Admin: ",
    type: Admin,
  })
  @Get(":id")
  async getAdminById(
    @Param("id", ParseIntPipe) id: number
  ): Promise<Admin | null> {
    return this.adminService.getAdminById(id);
  }

  @ApiOperation({ summary: "Admin ma'lumotlarini ism-familyasi orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Admin: ",
    type: Admin,
  })
  @Get()
  async findByAdminName(@Query("full_name") full_name: string) {
    return this.adminService.findByAdminName(full_name);
  }

  @ApiOperation({ summary: "Admin ma'lumotlarini id orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "Admin ma'lumotlari yangilandi! ",
    type: Admin,
  })
  @Patch(":id")
  async updateAdmin(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateAdminDto: UpdateAdminDto
  ) {
    return this.adminService.updateAdmin(id, updateAdminDto);
  }

  @ApiOperation({ summary: "Admin ma'lumotlarini id orqali ochirish" })
  @ApiResponse({
    status: 200,
    description: "Admin ma'lumotlari o'chirildi!",
    type: Admin,
  })
  @Delete(":id")
  async deleteAdmin(@Param("id", ParseIntPipe) id: number): Promise<string> {
    return this.adminService.deleteAdmin(id);
  }
}