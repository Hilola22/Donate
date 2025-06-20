import { Injectable } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "./models/role.model";

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private roleModel: typeof Role) {}

  create(createRoleDto: CreateRoleDto) {
    return this.roleModel.create(createRoleDto);
  }

  findAll() {
    return this.roleModel.findAll();
  }

  findOne(id: number) {
    return this.roleModel.findByPk(id);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleModel.update(updateRoleDto, {
      where: { id },
      returning: true,
    });
    return role[1][0];
  }

  async remove(id: number) {
    const result = await this.roleModel.destroy({ where: { id } });
    if (result > 0) {
      return `${id} - role o'chirildi`;
    }
    return `${id} - role mavjud emas`;
  }
}
