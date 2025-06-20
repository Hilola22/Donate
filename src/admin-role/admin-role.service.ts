import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAdminRoleDto } from "./dto/create-admin-role.dto";
import { UpdateAdminRoleDto } from "./dto/update-admin-role.dto";
import { InjectModel } from "@nestjs/sequelize";
import { AdminRole } from "./models/admin-role.model";
import { AdminService } from "../admin/admin.service";
import { RoleService } from "../role/role.service";
import { Role } from "../role/models/role.model";
import { Admin } from "../admin/models/admin.model";

@Injectable()
export class AdminRoleService {
  constructor(
    @InjectModel(AdminRole) private adminRoleModel: typeof AdminRole,
    private adminService: AdminService,
    private roleService: RoleService
  ) {}
  async create(createAdminRoleDto: CreateAdminRoleDto) {
    const role = await this.roleService.findOne(createAdminRoleDto.role_id);
    if (!role) {
      throw new NotFoundException("Role not found");
    }
    const admin = await this.adminService.getAdminById(
      createAdminRoleDto.admin_id
    );
    if (!admin) {
      throw new NotFoundException("Admin not found");
    }
    return this.adminRoleModel.create(createAdminRoleDto);
  }

  findAll() {
    return this.adminRoleModel.findAll({
      include: [
        { model: Role, attributes: ["name"] },
        {
          model: Admin,
          attributes: ["full_name", "email"],
          through: { attributes: [] },
        },
      ],
    });
  }

  findOne(id: number) {
    return this.adminRoleModel.findByPk(id, {
      include: [
        { model: Role, attributes: ["name"] },
        {
          model: Admin,
          attributes: ["full_name", "email"],
        },
      ],
    });
  }

  async update(id: number, updateAdminRoleDto: UpdateAdminRoleDto) {
    const adminRole = await this.adminRoleModel.update(updateAdminRoleDto, {
      where: { id },
      returning: true,
    });
    return adminRole[1][0];
  }

  async remove(id: number) {
    const result = await this.adminRoleModel.destroy({ where: { id } });
    if (result > 0) {
      return `${id}-admin-role o'chirildi!✅`;
    }
    return `${id}-admin-role mavjud emas!`;
  }
}
