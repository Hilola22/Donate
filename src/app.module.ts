import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { CategoryModule } from "./category/category.module";
import { Category } from "./category/models/category.model";
import { CourierModule } from "./courier/courier.module";
import { AdminModule } from "./admin/admin.module";
import { SocialModule } from "./social/social.module";
import { Courier } from "./courier/model/courier.model";
import { Admin } from "./admin/models/admin.model";
import { Social } from "./social/models/social.model";
import { UsersModule } from "./users/users.module";
import { Users } from "./users/models/user.model";
import { Notifications } from "./notifications/models/notification.model";
import { NotificationsModule } from "./notifications/notifications.module";
import { DonationsModule } from "./donations/donations.module";
import { Donation } from "./donations/models/donation.model";
import { CreatorSocialModule } from "./creator-social/creator-social.module";
import { CreatorSocial } from "./creator-social/models/creator-social.model";
import { RoleModule } from "./role/role.module";
import { AdminRoleModule } from "./admin-role/admin-role.module";
import { Role } from "./role/models/role.model";
import { AdminRole } from "./admin-role/models/admin-role.model";
import { ProductsModule } from "./products/products.module";
import { ProductImageModule } from "./product-image/product-image.module";
import { Product } from "./products/models/product.model";
import { ProductImage } from "./product-image/models/product-image.model";
import { WithdrawsModule } from "./withdraws/withdraws.module";
import { Withdraw } from "./withdraws/models/withdraw.model";
import { ProductOrdersModule } from "./product-orders/product-orders.module";
import { ProductOrder } from "./product-orders/models/product-order.model";
import { PaymentModule } from "./payment/payment.module";
import { SavedItemsModule } from "./saved-items/saved-items.module";
import { SavedItem } from "./saved-items/models/saved-item.model";
import { ProductReviewsModule } from './product-reviews/product-reviews.module';
import { ProductReview } from "./product-reviews/models/product-review.model";
import { CreatorStatisticsModule } from "./creator-statistics/creator-statistics.module";
import { CreatorStatistic } from "./creator-statistics/models/creator-statistic.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [
        Category,
        Courier,
        Admin,
        Social,
        Users,
        Notifications,
        Donation,
        CreatorSocial,
        Role,
        AdminRole,
        Product,
        ProductImage,
        Withdraw,
        ProductOrder,
        SavedItem,
        ProductReview,
        CreatorStatistic,
      ],
      autoLoadModels: true,
      logging: false,
      sync: { alter: true },
    }),
    CategoryModule,
    CourierModule,
    AdminModule,
    SocialModule,
    UsersModule,
    NotificationsModule,
    DonationsModule,
    CreatorSocialModule,
    RoleModule,
    AdminRoleModule,
    ProductsModule,
    ProductImageModule,
    WithdrawsModule,
    ProductOrdersModule,
    PaymentModule,
    SavedItemsModule,
    ProductReviewsModule,
    CreatorStatisticsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
