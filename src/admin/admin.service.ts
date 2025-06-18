import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { Admin } from "./models/admin.model";
import { UpdateAdminDto } from "./dto/update-admin.dto";

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminModel: typeof Admin) {}

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    const admin = await this.adminModel.create(createAdminDto);
    return admin;
  }

  async getAllAdmins(): Promise<Admin[]> {
    return this.adminModel.findAll();
  }

  async getAdminById(id: number): Promise<Admin | null> {
    return this.adminModel.findByPk(id);
  }

  async findByAdminName(full_name: string) {
    return this.adminModel.findOne({ where: { full_name } });
  }

  async updateAdmin(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminModel.update(updateAdminDto, {
      where: { id },
      returning: true,
    });
    return admin[1][0];
  }

  async deleteAdmin(id: number): Promise<string> {
    const res = await this.adminModel.destroy({ where: { id } });
    if (res > 0) {
      return `${id}-Admin deleted!`;
    }
    return `${id}-Admin not found`;
  }
}
