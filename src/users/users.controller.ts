import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Query,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Users } from "./models/user.model";
import { UserAuthGuard } from "../common/guards/user-auth.guard";
import { UserSelfGuard } from "../common/guards/user-self.guard";

@ApiTags("Foydalanuvchilar")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Yangi foydalanuvchi qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi foydalanuvchi qo'shildi!",
    type: Users,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: "Barcha foydalanuvchilar ro'yxatini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha foydalanuvchilar: ",
    type: [Users],
  })
  @UseGuards(UserAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: "Foydalanuvchini email orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi:",
    type: Users,
  })
  @Get("email")
  async getUserByEmail(@Query("email") email: string) {
    console.log(`email`, email);
    return this.usersService.getUserByEmail(email);
  }

  @ApiOperation({ summary: "Foydalanuvchini Id orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi:",
    type: Users,
  })
  @UseGuards(UserSelfGuard)
  @UseGuards(UserAuthGuard)
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: "Foydalanuvchini Id orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi yangilandi!",
    type: Users,
  })
  @UseGuards(UserSelfGuard)
  @UseGuards(UserAuthGuard)
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: "Foydalanuvchini Id orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi o'chirildi!",
    type: Users,
  })
  @UseGuards(UserSelfGuard)
  @UseGuards(UserAuthGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
