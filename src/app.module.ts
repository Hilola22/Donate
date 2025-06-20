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
        CreatorSocial
      ],
      autoLoadModels: true,
      logging: true,
      sync: { alter: true },
    }),
    CategoryModule,
    CourierModule,
    AdminModule,
    SocialModule,
    UsersModule,
    NotificationsModule,
    DonationsModule,
    CreatorSocialModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
