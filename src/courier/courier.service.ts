import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Courier } from "./model/courier.model";
import { CreateCourierDto } from "./dto/create-courier.dto";
import { UpdateCourierDto } from "./dto/update-courier.dto";


@Injectable()
export class CourierService{
    constructor(@InjectModel(Courier) private courierModel: typeof Courier){}

    async createCourier(createCourierDto: CreateCourierDto): Promise<Courier>{
        const courier = await this.courierModel.create(createCourierDto);
        return courier;
    }

    async getAllCouriers(): Promise<Courier[]> {
        return this.courierModel.findAll();
      }
    
      async getCourierById(id: number): Promise<Courier | null> {
        return this.courierModel.findByPk(id);
      }
    
      async findByCourierName(full_name: string) {
        return this.courierModel.findOne({ where: { full_name } });
      }
    
      async updateCourier(id: number, updateCourierDto: UpdateCourierDto) {
        const courier = await this.courierModel.update(updateCourierDto, {
          where: { id },
          returning: true,
        });
        return courier[1][0];
      }
    
      async deleteCourier(id: number): Promise<string>{
        const res = await this.courierModel.destroy({ where: { id } });
        if(res > 0){
            return `${id}-Courier deleted!`
        }
        return `${id}-Courier not found`
      }
}