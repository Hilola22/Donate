import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { Users } from "../users/models/user.model";
import { SignInUserDto } from "../users/dto/sign-in-user.dto";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { AdminService } from "../admin/admin.service";
import { Admin } from "../admin/models/admin.model";
import { SignInAdminDto } from "../admin/dto/sign-in-admin.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const condidate = await this.userService.getUserByEmail(
      createUserDto.email
    );

    if (condidate) {
      throw new ConflictException("Bunday foydalanuvchi allaqachon mavjud");
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;

    const newUser = await this.userService.create(createUserDto);
    return newUser;
  }

  private async generateToken(user: Users) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    let token: any;
    try {
      token = {
        token: this.jwtService.sign(payload, {
          secret: "SecretKeyUser",
          expiresIn: "12h",
        }),
      };
      console.log(token);
      return token;
    } catch (error) {
      console.log(error);
    }
  }

  async signin(signInuserDto: SignInUserDto) {
    const user = await this.userService.getUserByEmail(signInuserDto.email);
    if (!user) {
      throw new UnauthorizedException("email/parol notogri");
    }

    const validPassword = await bcrypt.compare(
      signInuserDto.password,
      user.password
    );

    if (!validPassword) {
      throw new UnauthorizedException(
        "Email yoki parol noto'g'ri (invalidPassword) "
      );
    }

    const token = await this.generateToken(user);

    return { message: "user signedin", id: user.id, token };
  }

  async signUpAdmin(createAdminDto: CreateAdminDto) {
    const admin = await this.adminService.getAdminByEmail(createAdminDto.email);

    if (admin) {
      throw new ConflictException("Bunday admin mavjud");
    }

    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);
    createAdminDto.password = hashedPassword;

    const newAdmin = await this.adminService.createAdmin(createAdminDto);
    return newAdmin;
  }

  private async generateTokenAdmin(admin: Admin) {
    const payload = {
      id: admin.id,
      email: admin.email,
    };

    let token: any;
    try {
      token = {
        token: this.jwtService.sign(payload, {
          secret: "SecretKeyAdmin",
          expiresIn: "12h" ,
        }),
      };
      console.log(token);
      return token;
    } catch (error) {
      console.log(error);
    }
  }

  async signInAdmin(signInAdminDto: SignInAdminDto) {
    const admin = await this.adminService.getAdminByEmail(signInAdminDto.email);
    if (!admin) {
      throw new UnauthorizedException("Email yoki parol noto'g'ri");
    }

    const validPassword = await bcrypt.compare(
      signInAdminDto.password,
      admin.password
    );

    if (!validPassword) {
      throw new UnauthorizedException(
        "Email yoki parol noto'g'ri (invalidPassword)"
      );
    }

    const token = await this.generateTokenAdmin(admin);

    return { message: "user signedin", id: admin.id, token };
  }
}
