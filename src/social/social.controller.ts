import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { SocialService } from "./social.service";
import { CreateSocialDto } from "./dto/create-social.dto";
import { Social } from "./models/social.model";
import { UpdateSocialDto } from "./dto/update-social.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Ijtimoiy  tarmoqlar")
@Controller("social")
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @ApiOperation({ summary: "Yangi ijtimoiy tarmoq qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi ijtimoiy tarmoq qo'shildi!",
    type: Social,
  })
  @Post()
  async createSocial(
    @Body() createSocialDto: CreateSocialDto
  ): Promise<Social> {
    return this.socialService.createSocial(createSocialDto);
  }

  @ApiOperation({ summary: "Barcha ijtimoiy tarmoqlar ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha ijtimoiy tarmoqlar:",
    type: [Social],
  })
  @Get()
  async getAllSocials(): Promise<Social[]> {
    return this.socialService.getAllSocials();
  }

  @ApiOperation({ summary: "Ijtimoiy tarmoqni Id orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Ijtimoiy tarmoq: ",
    type: Social,
  })
  @Get(":id")
  async getSocialById(
    @Param("id", ParseIntPipe) id: number
  ): Promise<Social | null> {
    return this.socialService.getSocialById(id);
  }

  @ApiOperation({ summary: "Ijtimoiy tarmoqni nomi orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Ijtimoiy tarmoq: ",
    type: Social,
  })
  @Get()
  async findSocialByName(@Query("name") name: string) {
    return this.socialService.findSocialByName(name);
  }

  @ApiOperation({ summary: "Ijtimoiy tarmoqni Id orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "Ijtimoiy tarmoq yangilandi!",
    type: Social,
  })
  @Patch(":id")
  async updateSocial(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateSocialDto: UpdateSocialDto
  ) {
    return this.socialService.updateSocial(id, updateSocialDto);
  }

  @ApiOperation({ summary: "Ijtimoiy tarmoqni Id orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Ijtimoiy tarmoq o'chirildi!",
    type: Social,
  })
  @Delete(":id")
  async deleteSocial(@Param("id", ParseIntPipe) id: number): Promise<string> {
    return this.socialService.deleteSocial(id);
  }
}
