import mongoose from "mongoose";
import { encrypt } from "../utils/encryption";
import { renderMailHtml, sendEmail } from "../utils/mail/mail";
import { CLIENT_HOST, EMAIL_SMTP_USER } from "../utils/env";

export interface User {
    fullName: string;
    userName: string;
    email: string;
    password: string;
    role: string;
    profilePicture: string;
    isActive: boolean;
    activationCode: string;
    createdAt?: string;
}

const Schema = mongoose.Schema;

const UserSchema = new Schema<User>(
    {
        fullName: {
            type: Schema.Types.String,
            required: true,
        },
        userName: {
            type: Schema.Types.String,
            required: true,
        },
        email: {
            type: Schema.Types.String,
            required: true,
        },
        password: {
            type: Schema.Types.String,
            required: true,
        },
        role: {
            type: Schema.Types.String,
            enum: ["user", "admin"],
            default: "user",
        },
        profilePicture: {
            type: Schema.Types.String,
            default: "user.jpg",
        },
        isActive: {
            type: Schema.Types.Boolean,
            default: false,
        },
        activationCode: {
            type: Schema.Types.String,
        },
    },
    {
        timestamps: true,
    },
);

// Before saving the user to the database, hashed or encrypt the password
UserSchema.pre("save", function (next) {
    const user = this;
    user.password = encrypt(user.password);
    user.activationCode = encrypt(user.id);
    next();
});

UserSchema.post("save", async function (doc, next) {
    try {
        const user = doc;
        console.log("Send Email to: ", user);
        const contentMail = await renderMailHtml("registration-success.ejs", {
            username: user.userName,
            fullName: user.fullName,
            email: user.email,
            createdAt: user.createdAt,
            activationLink: `${CLIENT_HOST}/auth/activation?code=${user.activationCode}`,
        });
        await sendEmail({
            from: EMAIL_SMTP_USER,
            to: user.email,
            subject: "Activation Link",
            html: contentMail,
        });
    } catch (error) {
        console.log("Error sending email: ", error);
    } finally {
        next();
    }
});

// Not send password data if UserSchema model is called
UserSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user.activationCode;
    return user;
};

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
