import { userRole } from "./user.constant";

export type TUser = {
    id: string;
    email: string;
    password: string;
    needPasswordChange: boolean;
    passwordChangeAt?: Date;
    role: 'admin' | 'faculty' | 'student';
    status: 'active' | 'blocked';
    isDeleted: boolean;
};

export type TUserRole = keyof typeof userRole;