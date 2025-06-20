import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { UsersModule } from '../users/users.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [SequelizeModule.forFeature([Product]), UsersModule, CategoryModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}
