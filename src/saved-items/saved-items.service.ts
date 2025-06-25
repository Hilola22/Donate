import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateSavedItemDto } from "./dto/create-saved-item.dto";
import { UpdateSavedItemDto } from "./dto/update-saved-item.dto";
import { SavedItem } from "./models/saved-item.model";
import { Product } from "../products/models/product.model";
import { Users } from "../users/models/user.model";
import { UsersService } from "../users/users.service";
import { ProductsService } from "../products/products.service";

@Injectable()
export class SavedItemsService {
  constructor(
    @InjectModel(SavedItem) private savedItemModel: typeof SavedItem,
    private usersService: UsersService,
    private productsService: ProductsService
  ) {}

  async create(createSavedItemDto: CreateSavedItemDto) {
    const user = await this.usersService.findOne(createSavedItemDto.user_id);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const product = await this.productsService.findOne(
      createSavedItemDto.product_id
    );
    if (!product) {
      throw new NotFoundException("Product not found");
    }

    const existingSavedItem = await this.savedItemModel.findOne({
      where: {
        user_id: createSavedItemDto.user_id,
        product_id: createSavedItemDto.product_id,
      },
    });

    if (existingSavedItem) {
      throw new NotFoundException("This item is already saved");
    }

    return this.savedItemModel.create(createSavedItemDto);
  }

  findAll() {
    return this.savedItemModel.findAll({
      include: [
        {
          model: Product,
          attributes: ["id", "name", "price", "description"],
        },
        {
          model: Users,
          attributes: ["id", "full_name", "email"],
        },
      ],
    });
  }

  findOne(id: number) {
    return this.savedItemModel.findByPk(id, {
      include: [
        {
          model: Product,
          attributes: ["id", "name", "price", "description"],
        },
        {
          model: Users,
          attributes: ["id", "full_name", "email"],
        },
      ],
    });
  }

  async findByUserId(userId: number) {
    return this.savedItemModel.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Product,
          attributes: ["id", "name", "price", "description"],
        },
        {
          model: Users,
          attributes: ["id", "full_name", "email"],
        },
      ],
    });
  }

  async update(id: number, updateSavedItemDto: UpdateSavedItemDto) {
    const savedItem = await this.savedItemModel.findByPk(id);
    if (!savedItem) {
      throw new NotFoundException("Saved item not found");
    }

    if (updateSavedItemDto.user_id) {
      const user = await this.usersService.findOne(updateSavedItemDto.user_id);
      if (!user) {
        throw new NotFoundException("User not found");
      }
    }

    if (updateSavedItemDto.product_id) {
      const product = await this.productsService.findOne(
        updateSavedItemDto.product_id
      );
      if (!product) {
        throw new NotFoundException("Product not found");
      }
    }

    const result = await this.savedItemModel.update(updateSavedItemDto, {
      where: { id },
      returning: true,
    });
    return result[1][0];
  }

  async remove(id: number) {
    const result = await this.savedItemModel.destroy({ where: { id } });
    if (result > 0) {
      return `${id}-saved item deleted!✅`;
    }
    return `${id}-saved item not found!`;
  }

  async removeByUserAndProduct(userId: number, productId: number) {
    const result = await this.savedItemModel.destroy({
      where: {
        user_id: userId,
        product_id: productId,
      },
    });
    if (result > 0) {
      return `Saved item deleted!✅`;
    }
    return `Saved item not found!`;
  }
}
