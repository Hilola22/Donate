import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import { AdminModule } from "src/admin/admin.module";

@Module({
  imports: [
    JwtModule.register({}),
    forwardRef(() => UsersModule),
    forwardRef(() => AdminModule),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
