import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Product } from "./models/product.model";
import { UsersService } from "../users/users.service";
import { CategoryService } from "../category/category.service";
import { Users } from "../users/models/user.model";
import { Category } from "../category/models/category.model";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productModel: typeof Product,
    private usersService: UsersService,
    private categoryService: CategoryService
  ) {}

  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryService.getCategoryById(
      createProductDto.category_id
    );
    if (!category) {
      throw new NotFoundException("Category not found");
    }
    const creator = await this.usersService.findOne(
      createProductDto.creator_id
    );
    if (!creator) {
      throw new NotFoundException("Creator not found");
    }
    return this.productModel.create(createProductDto);
  }

  findAll() {
    return this.productModel.findAll({
      include: [
        { model: Category, attributes: ["name"] },
        {
          model: Users,
          attributes: ["full_name", "email"],
        },
      ],
    });
  }

  findOne(id: number) {
    return this.productModel.findByPk(id, {
      include: [
        { model: Category, attributes: ["name"] },
        {
          model: Users,
          attributes: ["full_name", "email"],
        },
      ],
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productModel.update(updateProductDto, {
      where: { id },
      returning: true,
    });
    return product[1][0];
  }

  async remove(id: number) {
    const result = await this.productModel.destroy({ where: { id } });
    if (result > 0) {
      return `${id}-product deleted!✅`;
    }
    return `${id}-product not found!`;
  }
}
