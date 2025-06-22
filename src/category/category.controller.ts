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
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { Category } from "./models/category.model";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Mahsulot kategroiyasi")
@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: "Yangi kategoriya qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi kategoriya qo'shildi",
    type: Category,
  })
  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto
  ): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @ApiOperation({ summary: "Barcha kategoriyalar ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Kategoriyalar:",
    type: [Category],
  })
  @Get()
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @ApiOperation({ summary: "Kategoriyani ID orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Kategoriya:",
    type: Category,
  })
  @Get(":id")
  async getCategoryById(
    @Param("id", ParseIntPipe) id: number
  ): Promise<Category | null> {
    return this.categoryService.getCategoryById(id);
  }

  @ApiOperation({ summary: "Kategoriyani nomi orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Kategoriya:",
    type: Category,
  })
  @Get()
  async findByCategoryName(@Query("name") name: string) {
    return this.categoryService.findByCategoryName(name);
  }

  @ApiOperation({ summary: "Kategoriya ma'lumotlarini yangilash" })
  @ApiResponse({
    status: 200,
    description: "Kategoriya ma'lumotlari yangilandi",
    type: Category,
  })
  @Patch(":id")
  async updateCategory(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @ApiOperation({ summary: "Kategoriyani ID orqali o'chrish" })
  @ApiResponse({
    status: 201,
    description: "Kategoriya o'chirildi",
    type: Category,
  })
  @Delete(":id")
  async deleteCategory(@Param("id", ParseIntPipe) id: number): Promise<string> {
    return this.categoryService.deleteCategory(id);
  }
}