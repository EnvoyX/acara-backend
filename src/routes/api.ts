import express from "express";
import authController from "../controllers/auth.controller";
import authMiddlewareHandler from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.get("/auth/me", authMiddlewareHandler, authController.me);
router.post("/auth/activation", authController.activation);

export default router;
