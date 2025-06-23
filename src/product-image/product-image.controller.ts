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
import { ProductImageService } from "./product-image.service";
import { CreateProductImageDto } from "./dto/create-product-image.dto";
import { UpdateProductImageDto } from "./dto/update-product-image.dto";
import { ProductImage } from "./models/product-image.model";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Mahsulot rasmlari")
@Controller("product-image")
export class ProductImageController {
  constructor(private readonly productImageService: ProductImageService) {}

  @ApiOperation({ summary: "Yangi mahsulot-rasmini qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi mahsulot-rasmi qo'shildi!",
    type: ProductImage,
  })
  @Post()
  create(@Body() createProductImageDto: CreateProductImageDto) {
    return this.productImageService.create(createProductImageDto);
  }

  @ApiOperation({ summary: "Barcha mahsulot-rasmlari ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha mahsulot-rasmlari: ",
    type: [ProductImage],
  })
  @Get()
  findAll() {
    return this.productImageService.findAll();
  }

  @ApiOperation({ summary: "Mahsulot-rasmini id orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Mahsulot-rasmi: ",
    type: ProductImage,
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.productImageService.findOne(id);
  }

  @ApiOperation({ summary: "Mahsulot rasmini ID orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "Mahsulot-rasmi yangilandi ",
    type: ProductImage,
  })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateProductImageDto: UpdateProductImageDto
  ) {
    return this.productImageService.update(id, updateProductImageDto);
  }

  @ApiOperation({ summary: "Mahsulot rasmini ID orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Mahsulot rasmi o'chirildi ",
    type: ProductImage,
  })
  @Delete(":id")
  remove(@Param("id",ParseIntPipe) id: number) {
    return this.productImageService.remove(id);
  }
}
