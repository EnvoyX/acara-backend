import { Types } from "mongoose";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { SECRET } from "./env";

export interface UserToken extends Omit<
    User,
    | "password"
    | "activationCode"
    | "isActive"
    | "email"
    | "fullName"
    | "profilePicture"
    | "userName"
> {
    id: Types.ObjectId;
}

export const genereateToken = (user: UserToken): string => {
    const token = jwt.sign(user, SECRET, {
        expiresIn: "1d",
    });

    return token;
};

export const getUserData = (token: string) => {
    const user = jwt.verify(token, SECRET) as UserToken;
    return user;
};
