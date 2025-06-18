import { AdminRoles } from "../models/admin.model";

export class CreateAdminDto {
  full_name: string;
  email: string;
  role: AdminRoles;
  password: string;
  is_active: boolean;
}
