import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Notifications } from "./models/notification.model";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UsersService } from "../users/users.service";
import { UpdateNotificationDto } from "./dto/update-notification.dto";

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notifications) private notificationModel: typeof Notifications,
    private readonly userService: UsersService
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const { userId } = createNotificationDto;
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new BadRequestException("Bunday user mavjud emas!");
    }
    return this.notificationModel.create(createNotificationDto);
  }

  findAll() {
    return this.notificationModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.notificationModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    const user = await this.notificationModel.update(updateNotificationDto, {
      where: { id },
      returning: true,
    });
    return user[1][0];
  }

  async remove(id: number) {
    const result = await this.notificationModel.destroy({ where: { id } });
    if (result > 0) {
      return `${id}- xabar o'chirildi`;
    }
    return `${id} - Bunday xabar mavjud emas`;
  }
}
