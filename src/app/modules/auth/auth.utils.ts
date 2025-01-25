import jwt from 'jsonwebtoken';
import { TUserToken } from "./auth.interface";

export const createToken = (payload: TUserToken, secret_key: string, expIn: string) => {
    return jwt.sign(payload, secret_key, {expiresIn: expIn});
}