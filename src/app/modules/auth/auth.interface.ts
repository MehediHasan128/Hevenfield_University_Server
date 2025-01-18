export type TUserLogin = {
    email: string;
    password: string;
};

export type TResetData = TUserLogin

export type TChangePassword = {
    oldPassword: string;
    newPassword: string;
}

export type TUserToken = {
    userEmail: string;
    userId: string;
    userRole: string;
};

