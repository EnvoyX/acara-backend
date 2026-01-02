import { Types } from "mongoose";
import { User } from "../models/user.model";
import { Request } from "express";

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
    id?: Types.ObjectId;
}

export interface ReqUser extends Request {
    user?: UserToken;
}

export interface PaginationQuery {
    page: number;
    limit: number;
    search?: string;
}

export interface SendEmail {
    to: string;
    from: string;
    subject: string;
    html: string;
}
