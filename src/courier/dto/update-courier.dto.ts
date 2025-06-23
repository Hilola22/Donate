import { PartialType } from "@nestjs/mapped-types";
import { CreateCourierDto } from "./create-courier.dto";

export class UpdateUserDto extends PartialType(CreateCourierDto) {}
