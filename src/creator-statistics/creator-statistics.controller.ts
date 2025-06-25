import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreatorStatisticsService } from "./creator-statistics.service";
import { CreateCreatorStatisticDto } from "./dto/create-creator-statistic.dto";
import { UpdateCreatorStatisticDto } from "./dto/update-creator-statistic.dto";
import { CreatorStatistic } from "./models/creator-statistic.model";

@ApiTags("Creator statistikasi")
@Controller("creator-statistics")
export class CreatorStatisticsController {
  constructor(
    private readonly creatorStatisticsService: CreatorStatisticsService
  ) {}

  @ApiOperation({ summary: "Yangi creator statistikasi qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi creator statistikasi qo'shildi",
    type: CreatorStatistic,
  })
  @Post()
  create(@Body() createCreatorStatisticDto: CreateCreatorStatisticDto) {
    return this.creatorStatisticsService.create(createCreatorStatisticDto);
  }

  @ApiOperation({ summary: "Barcha creator statistikalarini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha creator statistikalar",
    type: [CreatorStatistic],
  })
  @Get()
  findAll() {
    return this.creatorStatisticsService.findAll();
  }

  @ApiOperation({ summary: "Creator statistikani ID orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Creator statistikasi",
    type: CreatorStatistic,
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.creatorStatisticsService.findOne(id);
  }

  @ApiOperation({ summary: "Creator statistikani ID orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "Creator statistikasi yangilandi",
    type: CreatorStatistic,
  })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateCreatorStatisticDto: UpdateCreatorStatisticDto
  ) {
    return this.creatorStatisticsService.update(id, updateCreatorStatisticDto);
  }

  @ApiOperation({ summary: "Creator statistikani ID orqali o'chirish" })
  @ApiResponse({ status: 200, description: "Creator statistikasi o'chirildi" })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.creatorStatisticsService.remove(id);
  }
}
