import { Request, Response } from "express";

type Register = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default {
  register(req: Request, res: Response) {
    const { fullName, username, email, password, confirmPassword } =
      req.body as unknown as Register;
  },
};
