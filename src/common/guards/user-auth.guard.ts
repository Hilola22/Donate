import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()
    console.log(req.headers);
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException({ message: "Auth header berilmagan" });
    }
    const bearer = authHeader.split(" ")[0];
    const token = authHeader.split(" ")[1];

    if (bearer != "Bearer" || !token) {
      throw new UnauthorizedException({ message: "Bearer token topilmadi" });
    }
    let decodedPayload: any;
    try {
      decodedPayload = this.jwtService.verify(token, {
        secret: process.env.USER_JWT_SECRET
      });
    } catch (error) {
      throw new UnauthorizedException({
        message: "Foydalanuvchi autorizatsiyadan o'tmagan",
        error: error,
      });
    }
    req.user = decodedPayload;
    return true;
  }
}
