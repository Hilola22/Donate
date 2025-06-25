import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CreatorStatisticsService } from "./creator-statistics.service";
import { CreatorStatisticsController } from "./creator-statistics.controller";
import { CreatorStatistic } from "./models/creator-statistic.model";
import { Users } from "../users/models/user.model";

@Module({
  imports: [SequelizeModule.forFeature([CreatorStatistic, Users])],
  controllers: [CreatorStatisticsController],
  providers: [CreatorStatisticsService],
  exports: [CreatorStatisticsService],
})
export class CreatorStatisticsModule {}
