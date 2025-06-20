import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCreatorSocialDto } from "./dto/create-creator-social.dto";
import { UpdateCreatorSocialDto } from "./dto/update-creator-social.dto";
import { InjectModel } from "@nestjs/sequelize";
import { CreatorSocial } from "./models/creator-social.model";
import { SocialService } from "../social/social.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class CreatorSocialService {
  constructor(
    @InjectModel(CreatorSocial)
    private creatorSocialModel: typeof CreatorSocial,
    private readonly socialService: SocialService,
    private readonly usersService: UsersService
  ) {}

  async create(createCreatorSocialDto: CreateCreatorSocialDto) {
    const user = await this.usersService.findOne(
      createCreatorSocialDto.creator_id
    );
    if (!user) {
      throw new NotFoundException("Creator not found");
    }
    const social = await this.socialService.getSocialById(
      createCreatorSocialDto.social_id
    );
    if (!social) {
      throw new NotFoundException("Social not found");
    }
    return this.creatorSocialModel.create(createCreatorSocialDto);
  }

  findAll() {
    return this.creatorSocialModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.creatorSocialModel.findByPk(id);
  }

  async update(id: number, updateCreatorSocialDto: UpdateCreatorSocialDto) {
    const creator_social = await this.creatorSocialModel.update(
      updateCreatorSocialDto,
      {
        where: { id },
        returning: true,
      }
    );
    return creator_social[1][0];
  }

  async remove(id: number) {
    const creatorSocial = await this.creatorSocialModel.destroy({where: {id}})
    if(creatorSocial > 0){
      return `${id} - creator_social o'chirildi` 
    }
    return `${id} - creator_social topilmadi`;
  }
}
