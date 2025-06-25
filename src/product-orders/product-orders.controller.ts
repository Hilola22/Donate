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
import { ProductOrdersService } from "./product-orders.service";
import { CreateProductOrderDto } from "./dto/create-product-order.dto";
import { UpdateProductOrderDto } from "./dto/update-product-order.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProductOrder } from "./models/product-order.model";

@ApiTags("Mahsulot buyurtmalari")
@Controller("product-orders")
export class ProductOrdersController {
  constructor(private readonly productOrdersService: ProductOrdersService) {}

  @ApiOperation({ summary: "Yangi buyurtma qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi buyurtma qo'shildi",
    type: ProductOrder,
  })
  @Post()
  create(@Body() createProductOrderDto: CreateProductOrderDto) {
    return this.productOrdersService.create(createProductOrderDto);
  }

  @ApiOperation({ summary: "Barcha buyurtmalar ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha buyurtmalar:",
    type: [ProductOrder],
  })
  @Get()
  findAll() {
    return this.productOrdersService.findAll();
  }

  @ApiOperation({ summary: "Buyurtmani Id raqami orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Buyurtma:",
    type: ProductOrder,
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.productOrdersService.findOne(id);
  }

  @ApiOperation({ summary: "Buyurtmani Id raqami orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "Buyurtma yangilandi",
    type: ProductOrder,
  })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateProductOrderDto: UpdateProductOrderDto
  ) {
    return this.productOrdersService.update(id, updateProductOrderDto);
  }

  @ApiOperation({ summary: "Buyurtmani Id raqami orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Buyurtma o'chirildi",
    type: ProductOrder,
  })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.productOrdersService.remove(id);
  }
}
