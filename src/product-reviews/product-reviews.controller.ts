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
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ProductReviewsService } from "./product-reviews.service";
import { CreateProductReviewDto } from "./dto/create-product-review.dto";
import { UpdateProductReviewDto } from "./dto/update-product-review.dto";
import { ProductReview } from "./models/product-review.model";

@ApiTags("Mahsulot izohlari")
@Controller("product-reviews")
export class ProductReviewsController {
  constructor(private readonly productReviewsService: ProductReviewsService) {}

  @ApiOperation({ summary: "Yangi mahsulot izohi qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi mahsulot izohi qo'shildi",
    type: ProductReview,
  })
  @Post()
  create(@Body() createProductReviewDto: CreateProductReviewDto) {
    return this.productReviewsService.create(createProductReviewDto);
  }

  @ApiOperation({ summary: "Barcha mahsulot izohlarini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha mahsulot izohlari",
    type: [ProductReview],
  })
  @Get()
  findAll() {
    return this.productReviewsService.findAll();
  }

  @ApiOperation({ summary: "Mahsulot izohini ID orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Mahsulot izohi",
    type: ProductReview,
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.productReviewsService.findOne(id);
  }

  @ApiOperation({ summary: "Mahsulot izohini ID orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "Mahsulot izohi yangilandi",
    type: ProductReview,
  })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateProductReviewDto: UpdateProductReviewDto
  ) {
    return this.productReviewsService.update(id, updateProductReviewDto);
  }

  @ApiOperation({ summary: "Mahsulot izohini ID orqali o'chirish" })
  @ApiResponse({ status: 200, description: "Mahsulot izohi o'chirildi" })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.productReviewsService.remove(id);
  }
}
