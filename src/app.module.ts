import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryModule } from './category/category.module';
import { Category } from './category/models/category.model';
import { CourierModule } from './courier/courier.module';
import { AdminModule } from './admin/admin.module';
import { SocialModule } from './social/social.module';

@Module({
  imports: [ConfigModule.forRoot({
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
    models:[Category],
    autoLoadModels: true,
    logging: true,
    sync: { alter: true },
  }),
   CategoryModule,
   CourierModule,
   AdminModule,
   SocialModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
