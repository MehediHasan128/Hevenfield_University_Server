import { Schema } from "mongoose";

export type TUserName = {
    firstName: string;
    middleName?: string;
    lastName: string;
};

export const userNameSchema = new Schema<TUserName>({
    firstName: { type: String, required: [true, 'First name is required.'] },
    middleName: { type: String },
    lastName: { type: String, required: [true, 'Last name is required.'] },
  });

export const userRole = {
    superAdmin: 'super-admin',
    registrar: 'registrar',
    admin: 'admin',
    faculty: 'faculty',
    student: 'student',
} as const;