import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminRoleDto } from './create-admin-role.dto';

export class UpdateAdminRoleDto extends PartialType(CreateAdminRoleDto) {}
