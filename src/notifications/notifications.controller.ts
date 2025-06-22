import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { NotificationsService } from "./notifications.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Notifications } from "./models/notification.model";

@ApiTags("Xabarnomalar")
@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @ApiOperation({ summary: "Yangi xabarnoma qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Yangi xabarnoma qo'shildi!",
    type: Notifications,
  })
  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @ApiOperation({ summary: "Barcha xabarnomalarni ro'yxatini ko'rish" })
  @ApiResponse({
    status: 200,
    description: "Barcha xabarnomalar: ",
    type: [Notifications],
  })
  @Get()
  findAll() {
    return this.notificationsService.findAll();
  }

  @ApiOperation({ summary: "Xabarnomani ID orqali olish" })
  @ApiResponse({
    status: 200,
    description: "Xabarnoma: ",
    type: Notifications,
  })
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.notificationsService.findOne(id);
  }

  @ApiOperation({ summary: "Xabarnomani ID orqali yangilash" })
  @ApiResponse({
    status: 200,
    description: "Xabarnoma yangilandi ",
    type: Notifications,
  })
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateNotificationDto: UpdateNotificationDto
  ) {
    return this.notificationsService.update(id, updateNotificationDto);
  }

  @ApiOperation({ summary: "Xabarnomani ID orqali o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Xabarnoma o'chirildi!",
    type: Notifications,
  })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.notificationsService.remove(id);
  }
}
