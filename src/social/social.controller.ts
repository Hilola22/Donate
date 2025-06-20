import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { SocialService } from "./social.service";
import { CreateSocialDto } from "./dto/create-social.dto";
import { Social } from "./models/social.model";
import { UpdateSocialDto } from "./dto/update-social.dto";


@Controller("social")
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @Post()
  async createSocial(
    @Body() createSocialDto: CreateSocialDto
  ): Promise<Social> {
    return this.socialService.createSocial(createSocialDto);
  }

  @Get()
  async getAllSocials(): Promise<Social[]> {
    return this.socialService.getAllSocials();
  }

  @Get(":id")
  async getSocialById(@Param("id") id: number): Promise<Social | null> {
    return this.socialService.getSocialById(id);
  }

  @Get()
  async findSocialByName(@Query("name") name: string) {
    return this.socialService.findSocialByName(name);
  }

  @Patch(":id")
  async updateSocial(
    @Param("id") id: number,
    @Body() updateSocialDto: UpdateSocialDto
  ) {
    return this.socialService.updateSocial(id, updateSocialDto);
  }

  @Delete(":id")
  async deleteSocial(@Param("id") id: number): Promise<string> {
    return this.socialService.deleteSocial(id);
  }
}