import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CreatorSocialService } from './creator-social.service';
import { CreateCreatorSocialDto } from './dto/create-creator-social.dto';
import { UpdateCreatorSocialDto } from './dto/update-creator-social.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatorSocial } from './models/creator-social.model';

@ApiTags("Creator-ijtimoiy tarmoqlari")
@Controller("creator-social")
export class CreatorSocialController {
  constructor(private readonly creatorSocialService: CreatorSocialService) {}

  @ApiOperation({ summary: "Yangi user-ijtimoiy_tarmoq qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi user_ijtimoiy_tarmoq qo'shildi",
    type: CreatorSocial,
  })
  @Post()
  create(@Body() createCreatorSocialDto: CreateCreatorSocialDto) {
    return this.creatorSocialService.create(createCreatorSocialDto);
  }

  @ApiOperation({ summary: "Barcha user-ijtimoiy_tarmoq ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha user_ijtimoiy_tarmoqlari:",
    type: [CreatorSocial],
  })
  @Get()
  findAll() {
    return this.creatorSocialService.findAll();
  }

  @ApiOperation({ summary: "Yangi user-ijtimoiy_tarmoq qo'shish" })
  @ApiResponse({
    status: 200,
    description: "User-ijtimoiy_tarmog'i: ",
    type: CreatorSocial,
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.creatorSocialService.findOne(id);
  }

  @ApiOperation({
    summary: "User-ijtimoiy_tarmoq ma'lumotlarini ID orqali yangilash",
  })
  @ApiResponse({
    status: 200,
    description: "User_ijtimoiy_tarmoq ma'lumotlari yangilandi",
    type: CreatorSocial,
  })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateCreatorSocialDto: UpdateCreatorSocialDto
  ) {
    return this.creatorSocialService.update(id, updateCreatorSocialDto);
  }

  @ApiOperation({ summary: "User-ijtimoiy_tarmoq ma'lumotlarini ID orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "User_ijtimoiy_tarmog'i o'chirildi",
    type: CreatorSocial,
  })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.creatorSocialService.remove(id);
  }
}
