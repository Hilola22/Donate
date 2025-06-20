export enum UserRole {
    CREATOR = "creator",
    USER = "user"
}

export class CreateUserDto {
    full_name: string;
    email: string;
    password: string;
    role: UserRole;
    bio: string;
    avatar_url: string;
    banner_url: string;
}
