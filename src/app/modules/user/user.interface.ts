import { TUserName, userRole } from "./user.constant";

export type TUser = {
    id: string;
    email: string;
    userName: TUserName;
    password: string;
    needPasswordChange: boolean;
    passwordChangeAt?: Date;
    role: 'super-admin' | 'registrar' | 'admin' | 'faculty' | 'student';
    status: 'active' | 'blocked';
    isDeleted: boolean;
};

export type TUserRole = keyof typeof userRole;