import { NextFunction, Request, Response } from "express";
import { UserToken, getUserData } from "../utils/jwt";

export interface ReqUser extends Request {
    user: UserToken;
}

export default function authMiddlewareHandler(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const authorization = req.headers?.authorization;

    if (!authorization) {
        return res.status(403).json({
            message: "Unauthorized",
            data: null,
        });
    }

    const [prefix, token] = authorization.split(" ");

    if (!(prefix === "Bearer" && token)) {
        return res.status(403).json({
            message: "Unauthorized",
            data: null,
        });
    }

    const user = getUserData(token);

    if (!user) {
        return res.status(403).json({
            message: "Unauthorized, User not found",
            data: null,
        });
    }

    (req as ReqUser).user = user;

    next();
}
