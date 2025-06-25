import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AdminSelfGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()
    console.log(req.admin);
    if(req.admin.id != req.params.id){
      throw new ForbiddenException({
        message: "Ruxsat etilmagan admin"
      })
    }
    return true;
  }
}
