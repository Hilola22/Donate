import { PartialType } from "@nestjs/mapped-types";
import { CreateSocialDto } from "./create-social.dto";

export class UpdateUserDto extends PartialType(CreateSocialDto) {}
