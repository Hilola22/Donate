import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SavedItemsService } from "./saved-items.service";
import { CreateSavedItemDto } from "./dto/create-saved-item.dto";
import { UpdateSavedItemDto } from "./dto/update-saved-item.dto";
import { SavedItem } from "./models/saved-item.model";

@ApiTags("Saqlangan mahsulotlar")
@Controller("saved-items")
export class SavedItemsController {
  constructor(private readonly savedItemsService: SavedItemsService) {}

  @ApiOperation({ summary: "Yangi saqlangan mahsulot qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi saqlangan mahsulot qo'shildi",
    type: SavedItem,
  })
  @Post()
  create(@Body() createSavedItemDto: CreateSavedItemDto) {
    return this.savedItemsService.create(createSavedItemDto);
  }

  @ApiOperation({ summary: "Barcha saqlangan mahsulotlar ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha saqlangan mahsulotlar: ",
    type: [SavedItem],
  })
  @Get()
  findAll() {
    return this.savedItemsService.findAll();
  }

  @ApiOperation({ summary: "Foydalanuvchining saqlangan mahsulotlarini olish" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchining saqlangan mahsulotlari: ",
    type: [SavedItem],
  })
  @Get("user/:userId")
  findByUserId(@Param("userId", ParseIntPipe) userId: number) {
    return this.savedItemsService.findByUserId(userId);
  }

  @ApiOperation({ summary: "Saqlangan mahsulotni Id raqami orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Saqlangan mahsulot:",
    type: SavedItem,
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.savedItemsService.findOne(id);
  }

  @ApiOperation({ summary: "Saqlangan mahsulotni Id raqami orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "Saqlangan mahsulot yangilandi",
    type: SavedItem,
  })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateSavedItemDto: UpdateSavedItemDto
  ) {
    return this.savedItemsService.update(id, updateSavedItemDto);
  }

  @ApiOperation({ summary: "Saqlangan mahsulotni Id raqami orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Saqlangan mahsulot o'chirildi",
    type: SavedItem,
  })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.savedItemsService.remove(id);
  }

  @ApiOperation({
    summary:
      "Foydalanuvchi va mahsulot bo'yicha saqlangan mahsulotni o'chirish",
  })
  @ApiResponse({
    status: 200,
    description: "Saqlangan mahsulot o'chirildi",
  })
  @Delete("user/:userId/product/:productId")
  removeByUserAndProduct(
    @Param("userId", ParseIntPipe) userId: number,
    @Param("productId", ParseIntPipe) productId: number
  ) {
    return this.savedItemsService.removeByUserAndProduct(userId, productId);
  }
}
