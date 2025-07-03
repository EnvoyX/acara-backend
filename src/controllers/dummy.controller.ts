import { Request, Response } from "express";

export default {
  dummy(req: Request, res: Response) {
    res.status(200).json({
      message: "Sucess hit endpoint dummy",
      data: "OK GAS",
    });
  },
};
