import mongoose from "mongoose";

import { DATABASE_URL } from "./env";

async function connect() {
    try {
        await mongoose.connect(DATABASE_URL, {
            dbName: "db-acara",
        });

        return Promise.resolve("Connected to database!");
    } catch (error) {
        return Promise.reject(error);
    }
}

export default connect;
