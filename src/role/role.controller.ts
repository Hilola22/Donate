import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './models/role.model';

@ApiTags("Rollar")
@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: "Yangi rol qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi rol qo'shildi!",
    type: Role,
  })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiOperation({ summary: "Barcha rollar ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha rollar: ",
    type: [Role],
  })
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @ApiOperation({ summary: "Rolni Id orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Rol: ",
    type: Role,
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.roleService.findOne(id);
  }

  @ApiOperation({ summary: "Rolni Id orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "Rol yangilandi!",
    type: Role,
  })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto
  ) {
    return this.roleService.update(id, updateRoleDto);
  }

  @ApiOperation({ summary: "Rolni Id orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Rol o'chirildi!",
    type: Role,
  })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.roleService.remove(id);
  }
}
