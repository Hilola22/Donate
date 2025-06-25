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
  Request,
  UseGuards,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { Admin } from "./models/admin.model";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AdminAuthGuard } from "../common/guards/admin-auth.guard";
import { AdminSelfGuard } from "../common/guards/admin-self.guard";
import { emit } from "process";


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
  // @UseGuards(AdminAuthGuard)
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
  @UseGuards(AdminAuthGuard)
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
  @UseGuards(AdminSelfGuard)
  @UseGuards(AdminAuthGuard)
  @Get(":id")
  async getAdminById(
    @Param("id", ParseIntPipe) id: number
  ): Promise<Admin | null> {
    return this.adminService.getAdminById(id);
  }

  @ApiOperation({ summary: "Admin ma'lumotlarini email orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Admin: ",
    type: Admin,
  })
  @Post("email")
  async getAdminByEmail(@Body("email") email: string,) {
    return this.adminService.getAdminByEmail(email);
  }

  @ApiOperation({ summary: "Admin ma'lumotlarini id orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "Admin ma'lumotlari yangilandi! ",
    type: Admin,
  })
  @UseGuards(AdminSelfGuard)
  @UseGuards(AdminAuthGuard)
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
  @UseGuards(AdminSelfGuard)
  @UseGuards(AdminAuthGuard)
  @Delete(":id")
  async deleteAdmin(@Param("id", ParseIntPipe) id: number): Promise<string> {
    return this.adminService.deleteAdmin(id);
  }
}