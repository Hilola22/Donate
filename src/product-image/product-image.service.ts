import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductImageDto } from "./dto/create-product-image.dto";
import { UpdateProductImageDto } from "./dto/update-product-image.dto";
import { ProductImage } from "./models/product-image.model";
import { InjectModel } from "@nestjs/sequelize";
import { ProductsService } from "../products/products.service";
import { Product } from "../products/models/product.model";
import { FilesService } from "../files/files.service";

@Injectable()
export class ProductImageService {
  constructor(
    @InjectModel(ProductImage) private productImageModel: typeof ProductImage,
    private readonly productService: ProductsService,
    private readonly fileService: FilesService
  ) {}

  async create(createProductImageDto: CreateProductImageDto, image_url: any) {
    const product = await this.productService.findOne(
      createProductImageDto.product_id
    );
    if (!product) {
      throw new NotFoundException("Product not found");
    }
    const fileName = await this.fileService.saveFile(image_url);
    return this.productImageModel.create({
      ...createProductImageDto,
      image_url: fileName,
    });
  }

  findAll() {
    return this.productImageModel.findAll({
      include: [{ model: Product, attributes: ["name", "price"] }],
    });
  }

  findOne(id: number) {
    return this.productImageModel.findByPk(id, {
      include: [{ model: Product, attributes: ["name", "price"] }],
    });
  }

  update(id: number, updateProductImageDto: UpdateProductImageDto) {
    const productImage = this.productImageModel.update(updateProductImageDto, {
      where: { id },
      returning: true,
    });
    return productImage[1][0];
  }

  async remove(id: number) {
    const result = await this.productImageModel.destroy({ where: { id } });
    if (result > 0) {
      return `${id}-product deleted!✅`;
    }
    return `${id}-product not found!`;
  }
}
