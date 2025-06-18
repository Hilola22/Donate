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
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { Category } from "./models/category.model";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto
  ): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @Get(":id")
  async getCategoryById(@Param("id") id: number): Promise<Category | null> {
    return this.categoryService.getCategoryById(id);
  }

  @Get()
  async findByCategoryName(@Query("name") name: string) {
    return this.categoryService.findByCategoryName(name);
  }

  @Patch(":id")
  async updateCategory(
    @Param("id") id: number,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Delete(":id")
  async deleteCategory(@Param("id") id: number): Promise<string> {
    return this.categoryService.deleteCategory(id);
  }
}