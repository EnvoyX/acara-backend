export type Register = {
    fullName: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type Login = {
    identifier: string;
    password: string;
};
