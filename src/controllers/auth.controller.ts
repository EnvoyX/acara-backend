import { Request, Response } from "express";
import * as Yup from "yup";

import UserModel from "../models/user.model";

type Register = {
    fullName: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const registerSchema = Yup.object({
    fullName: Yup.string().required(),
    userName: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required(),
    confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("password"), ""], "Passwords not match"),
});

export default {
    async register(req: Request, res: Response) {
        const { fullName, userName, email, password, confirmPassword } =
            req.body as unknown as Register;

        try {
            await registerSchema.validate({
                fullName,
                userName,
                email,
                password,
                confirmPassword,
            });

            const result = await UserModel.create({
                fullName,
                userName,
                email,
                password,
            });

            res.status(200).json({
                message: "Successful registration!",
                data: result,
            });
        } catch (error) {
            const err = error as unknown as Error;
            res.status(400).json({
                message: err.message,
                data: null,
            });
        }
    },
};
