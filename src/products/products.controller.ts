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
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Product } from "./models/product.model";

@ApiTags("Mahsulotlar")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: "Yangi mahsulot qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi mahsulot qo'shildi",
    type: Product,
  })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiOperation({ summary: "Barcha mahsulotlar ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha mahsulotlar: ",
    type: [Product],
  })
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @ApiOperation({ summary: "Mahsulotni Id raqami orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Mahsulot:",
    type: Product,
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @ApiOperation({ summary: "Mahsulotni Id raqami orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "Mahsulot yangilandi",
    type: Product,
  })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @ApiOperation({ summary: "Mahsulotni Id raqami orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Mahsulot o'chirild",
    type: Product,
  })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
