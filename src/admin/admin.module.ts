import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
    imports: [SequelizeModule.forFeature([Admin])],
    controllers: [AdminController],
    providers: [AdminService],
    exports: [AdminService]
})
export class AdminModule {}
