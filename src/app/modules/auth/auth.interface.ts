export type TUserLogin = {
    email?: string;
    password: string;
};

export type TUserToken = {
    userEmail: string;
    userId: string;
    userRole: string;
}