import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminRoleService } from './admin-role.service';
import { CreateAdminRoleDto } from './dto/create-admin-role.dto';
import { UpdateAdminRoleDto } from './dto/update-admin-role.dto';

@Controller('admin-role')
export class AdminRoleController {
  constructor(private readonly adminRoleService: AdminRoleService) {}

  @Post()
  create(@Body() createAdminRoleDto: CreateAdminRoleDto) {
    return this.adminRoleService.create(createAdminRoleDto);
  }

  @Get()
  findAll() {
    return this.adminRoleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminRoleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminRoleDto: UpdateAdminRoleDto) {
    return this.adminRoleService.update(+id, updateAdminRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminRoleService.remove(+id);
  }
}
