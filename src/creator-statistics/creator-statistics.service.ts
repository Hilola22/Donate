import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateCreatorStatisticDto } from "./dto/create-creator-statistic.dto";
import { UpdateCreatorStatisticDto } from "./dto/update-creator-statistic.dto";
import { CreatorStatistic } from "./models/creator-statistic.model";
import { Users } from "../users/models/user.model";

@Injectable()
export class CreatorStatisticsService {
  constructor(
    @InjectModel(CreatorStatistic)
    private creatorStatisticModel: typeof CreatorStatistic
  ) {}

  async create(createCreatorStatisticDto: CreateCreatorStatisticDto) {
    const creator = await Users.findByPk(createCreatorStatisticDto.creator_id);
    if (!creator) {
      throw new NotFoundException("Creator not found");
    }
    return this.creatorStatisticModel.create(createCreatorStatisticDto);
  }

  findAll() {
    return this.creatorStatisticModel.findAll({
      include: [{ model: Users, attributes: ["id", "full_name", "email"] }],
    });
  }

  findOne(id: number) {
    return this.creatorStatisticModel.findByPk(id, {
      include: [{ model: Users, attributes: ["id", "full_name", "email"] }],
    });
  }

  async update(
    id: number,
    updateCreatorStatisticDto: UpdateCreatorStatisticDto
  ) {
    const stat = await this.creatorStatisticModel.update(
      updateCreatorStatisticDto,
      {
        where: { id },
        returning: true,
      }
    );
    return stat[1][0];
  }

  async remove(id: number) {
    const result = await this.creatorStatisticModel.destroy({ where: { id } });
    if (result > 0) {
      return `${id}-creator statistic deleted!`;
    }
    return `${id}-creator statistic not found!`;
  }
}
