import { Category } from "./models/category.model";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto
  ): Promise<Category> {
    const category = await this.categoryModel.create(createCategoryDto);
    return category;
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryModel.findAll();
  }

  async getCategoryById(id: number): Promise<Category | null> {
    return this.categoryModel.findByPk(id);
  }

  async findByCategoryName(name: string) {
    return this.categoryModel.findOne({ where: { name } });
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryModel.update(updateCategoryDto, {
      where: { id },
      returning: true,
    });
    return category[1][0];
  }

  async deleteCategory(id: number): Promise<string>{
    const res = await this.categoryModel.destroy({where:{id}});
    if(res > 0){
        return `${id}-category deleted!`
    }
    return `${id}-Category not found`
  }
}
