import { Request, Response } from "express";
import * as Yup from "yup";

type Register = {
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const registerSchema = Yup.object({
  fullname: Yup.string().required(),
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), ""], "Passwords not match"),
});

export default {
  async register(req: Request, res: Response) {
    const { fullname, username, email, password, confirmPassword } =
      req.body as unknown as Register;

    try {
      await registerSchema.validate({
        fullname,
        username,
        email,
        password,
        confirmPassword,
      });
      res.status(200).json({
        message: "Successful registration!",
        data: {
          fullname,
          username,
          email,
        },
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
