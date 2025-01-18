export type TUserName = {
    firstName: string;
    middleName?: string;
    lastName: string;
};

export const userRole = {
    student: 'student',
    faculty: 'faculty',
    admin: 'admin'
} as const;