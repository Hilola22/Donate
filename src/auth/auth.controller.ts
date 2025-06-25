import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SignInUserDto } from "../users/dto/sign-in-user.dto";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { SignInAdminDto } from "../admin/dto/sign-in-admin.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("signin")
  signin(@Body() SignInUserDto: SignInUserDto) {
    return this.authService.signin(SignInUserDto);
  }

  @Post("signup-admin")
  signUpAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.signUpAdmin(createAdminDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("signin-admin")
  signInAdmin(@Body() signInAdminDto: SignInAdminDto) {
    return this.authService.signInAdmin(signInAdminDto);
  }
}
