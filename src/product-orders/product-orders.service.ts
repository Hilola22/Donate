import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ProductOrder } from "./models/product-order.model";
import { CreateProductOrderDto } from "./dto/create-product-order.dto";
import { UpdateProductOrderDto } from "./dto/update-product-order.dto";
import { UsersService } from "../users/users.service";
import { ProductsService } from "../products/products.service";
import { CourierService } from "../courier/courier.service";
import { Users } from "../users/models/user.model";
import { Product } from "../products/models/product.model";
import { Courier } from "../courier/model/courier.model";

@Injectable()
export class ProductOrdersService {
  constructor(
    @InjectModel(ProductOrder) private productOrderModel: typeof ProductOrder,
    private usersService: UsersService,
    private productsService: ProductsService,
    private courierService: CourierService
  ) {}

  async create(createProductOrderDto: CreateProductOrderDto) {
    const buyer = await this.usersService.findOne(
      createProductOrderDto.buyer_id
    );
    if (!buyer) {
      throw new NotFoundException("Buyer not found");
    }
    const product = await this.productsService.findOne(
      createProductOrderDto.product_id
    );
    if (!product) {
      throw new NotFoundException("Product not found");
    }
    const courier = await this.courierService.getCourierById(
      createProductOrderDto.kuryer_id
    );
    if (!courier) {
      throw new NotFoundException("Courier not found");
    }
    return this.productOrderModel.create(createProductOrderDto);
  }

  findAll() {
    return this.productOrderModel.findAll({
      include: [
        { model: Users, attributes: ["full_name", "email"] },
        { model: Product, attributes: ["name", "price"] },
        { model: Courier, attributes: ["full_name", "phone_number"] },
      ],
    });
  }

  findOne(id: number) {
    return this.productOrderModel.findByPk(id, {
      include: [
        { model: Users, attributes: ["full_name", "email"] },
        { model: Product, attributes: ["name", "price"] },
        { model: Courier, attributes: ["full_name", "phone_number"] },
      ],
    });
  }

  async update(id: number, updateProductOrderDto: UpdateProductOrderDto) {
    const productOrder = await this.productOrderModel.update(
      updateProductOrderDto,
      {
        where: { id },
        returning: true,
      }
    );
    return productOrder[1][0];
  }

  async remove(id: number) {
    const result = await this.productOrderModel.destroy({ where: { id } });
    if (result > 0) {
      return `${id}-productOrder deleted!✅`;
    }
    return `${id}-productOrder not found!`;
  }
}
