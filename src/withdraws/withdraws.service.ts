import { Injectable } from "@nestjs/common";
import { CreateWithdrawDto } from "./dto/create-withdraw.dto";
import { UpdateWithdrawDto } from "./dto/update-withdraw.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Withdraw } from "./models/withdraw.model";
import { UsersService } from "../users/users.service";
import { Users } from "../users/models/user.model";

@Injectable()
export class WithdrawsService {
  constructor(
    @InjectModel(Withdraw) private withdrawModel: typeof Withdraw,
    private readonly creatorService: UsersService
  ) {}
  async create(createWithdrawDto: CreateWithdrawDto) {
    const creator = await this.creatorService.findOne(
      createWithdrawDto.creatorId
    );
    if (!creator) {
      return "Creator topilmadi";
    }
    return this.withdrawModel.create(createWithdrawDto);
  }

  findAll() {
    return this.withdrawModel.findAll({
      include: [{ model: Users, attributes: ["full_name", "email"] }],
    });
  }

  findOne(id: number) {
    return this.withdrawModel.findByPk(id, {
      include: [{ model: Users, attributes: ["full_name", "email"] }],
    });
  }

  async update(id: number, updateWithdrawDto: UpdateWithdrawDto) {
    const withdraw = await this.withdrawModel.update(updateWithdrawDto, {
      where: { id },
      returning: true,
    });
    return withdraw[1][0]
  }

  async remove(id: number) {
    const withdraw = await this.withdrawModel.destroy({where: {id}})
    if(withdraw>0){
      return "Withdraw o'chirildi!"
    }
    return "Bunday withdraw topilmadi!";
  }
}
