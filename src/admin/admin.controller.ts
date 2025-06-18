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
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { Admin } from "./models/admin.model";
import { UpdateAdminDto } from "./dto/update-admin.dto";



@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async createAdmin(
    @Body() createAdminDto: CreateAdminDto
  ): Promise<Admin> {
    return this.adminService.createAdmin(createAdminDto);
  }

  @Get()
  async getAllAdmins(): Promise<Admin[]> {
    return this.adminService.getAllAdmins();
  }

  @Get(":id")
  async getAdminById(@Param("id") id: number): Promise<Admin | null> {
    return this.adminService.getAdminById(id);
  }

  @Get()
  async findByAdminName(@Query("full_name") full_name: string) {
    return this.adminService.findByAdminName(full_name);
  }

  @Patch(":id")
  async updateAdmin(
    @Param("id") id: number,
    @Body() updateAdminDto: UpdateAdminDto
  ) {
    return this.adminService.updateAdmin(id, updateAdminDto);
  }

  @Delete(":id")
  async deleteAdmin(@Param("id") id: number): Promise<string> {
    return this.adminService.deleteAdmin(id);
  }
}