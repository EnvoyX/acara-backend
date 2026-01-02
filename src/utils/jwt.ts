import jwt from "jsonwebtoken";
import { SECRET } from "./env";
import { UserToken } from "./interface";

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
