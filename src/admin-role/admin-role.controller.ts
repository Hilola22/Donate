import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AdminRoleService } from './admin-role.service';
import { CreateAdminRoleDto } from './dto/create-admin-role.dto';
import { UpdateAdminRoleDto } from './dto/update-admin-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminRole } from './models/admin-role.model';

@ApiTags("Admin-Rollari")
@Controller("admin-role")
export class AdminRoleController {
  constructor(private readonly adminRoleService: AdminRoleService) {}

  @ApiOperation({ summary: "Yangi admin-role qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi admin-role qo'shildi!",
    type: AdminRole,
  })
  @Post()
  create(@Body() createAdminRoleDto: CreateAdminRoleDto) {
    return this.adminRoleService.create(createAdminRoleDto);
  }

  @ApiOperation({ summary: "Barcha admin-rollar ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Admin-rollar: ",
    type: [AdminRole],
  })
  @Get()
  findAll() {
    return this.adminRoleService.findAll();
  }

  @ApiOperation({ summary: "Admin-rolni id orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Admin-role: ",
    type: AdminRole,
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.adminRoleService.findOne(id);
  }

  @ApiOperation({ summary: "Admin-role ma'lumotlarini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Admin-role ma'lumotlari yangilandi!",
    type: AdminRole,
  })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateAdminRoleDto: UpdateAdminRoleDto
  ) {
    return this.adminRoleService.update(id, updateAdminRoleDto);
  }

  @ApiOperation({ summary: "Admin-role ma'lumotini o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Admin-role o'chirildi! ",
    type: AdminRole,
  })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.adminRoleService.remove(id);
  }
}
