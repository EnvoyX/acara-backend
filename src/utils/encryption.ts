import crypto from "crypto";
import { SECRET } from "./env";

export function encrypt(password: string): string {
    const ecrypted = crypto
        .pbkdf2Sync(password, SECRET, 1000, 64, "sha512")
        .toString("hex");

    return ecrypted;
}
