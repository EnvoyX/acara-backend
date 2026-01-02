import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        version: "1.0.0",
        title: "API Documentation for Acara",
        description: "API made with Express + Typescript",
    },
    servers: [
        {
            url: "http://localhost:3000/api",
            description: "Local Server",
        },
        {
            url: "https://acara-backend-nine.vercel.app/api",
            description: "Deploy Server",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
            },
        },
        schemas: {
            LoginRequest: {
                identifier: "Envoy",
                password: "123456",
            },
        },
    },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["../routes/api.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
