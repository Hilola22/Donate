import { Module } from "@nestjs/common";
import { AdminRoleService } from "./admin-role.service";
import { AdminRoleController } from "./admin-role.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { AdminRole } from "./models/admin-role.model";
import { AdminModule } from "../admin/admin.module";
import { RoleModule } from "../role/role.module";

@Module({
  imports: [SequelizeModule.forFeature([AdminRole]), AdminModule, RoleModule],
  controllers: [AdminRoleController],
  providers: [AdminRoleService],
})
export class AdminRoleModule {}
