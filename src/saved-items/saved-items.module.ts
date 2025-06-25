import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { SavedItemsService } from "./saved-items.service";
import { SavedItemsController } from "./saved-items.controller";
import { SavedItem } from "./models/saved-item.model";
import { UsersModule } from "../users/users.module";
import { ProductsModule } from "../products/products.module";

@Module({
  imports: [
    SequelizeModule.forFeature([SavedItem]),
    UsersModule,
    ProductsModule,
  ],
  controllers: [SavedItemsController],
  providers: [SavedItemsService],
  exports: [SavedItemsService],
})
export class SavedItemsModule {}
