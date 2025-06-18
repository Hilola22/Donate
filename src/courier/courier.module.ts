import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Courier } from './model/courier.model';
import { CourierController } from './courier.controller';
import { CourierService } from './courier.service';

@Module({
    imports: [SequelizeModule.forFeature([Courier])],
    controllers: [CourierController],
    providers: [CourierService]
})
export class CourierModule {}
