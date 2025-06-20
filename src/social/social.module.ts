import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Social } from './models/social.model';
import { SocialController } from './social.controller';
import { SocialService } from './social.service';

@Module({
    imports: [SequelizeModule.forFeature([Social])],
    controllers: [SocialController],
    providers: [SocialService],
    exports: [SocialService]
})
export class SocialModule {}
