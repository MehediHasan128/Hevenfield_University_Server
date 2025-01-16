import { TUserToken } from "./auth.interface";
import jwt from 'jsonwebtoken';

export const createToken = (payload: TUserToken, secret_key: string, expIn: string) => {
    return jwt.sign(payload, secret_key, {expiresIn: expIn});
}