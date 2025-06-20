import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateDonationDto } from "./dto/create-donation.dto";
import { UpdateDonationDto } from "./dto/update-donation.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Donation } from "./models/donation.model";
import { Users } from "../users/models/user.model";
import { UsersService } from "../users/users.service";

@Injectable()
export class DonationsService {
  constructor(
    @InjectModel(Donation) private donationModel: typeof Donation,
    private readonly usersService: UsersService
  ) {}

  async create(createDonationDto: CreateDonationDto) {
    const supporter = await this.usersService.findOne(
      createDonationDto.supporter_id
    );
    if (!supporter) {
      throw new NotFoundException("Bunday supporter mavjud emas");
    }

    const creator = await this.usersService.findOne(
      createDonationDto.creator_id
    );
    if (!creator) {
      throw new NotFoundException("Bunday creator mavjud emas");
    }

    const newDonation = await this.donationModel.create(createDonationDto);
    return newDonation;
  }

  findAll() {
    return this.donationModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.donationModel.findByPk(id);
  }

  async update(id: number, updateDonationDto: UpdateDonationDto) {
    const donation = await this.donationModel.update(updateDonationDto, {
      where: { id },
      returning: true,
    });
    return donation;
  }

  async remove(id: number) {
    const donation = await this.donationModel.destroy({where: {id}});
    if(!donation){
      return `${id} - donation topilmadi!`;
    }
    return `${id} - donation deleted!`;
  }
}
