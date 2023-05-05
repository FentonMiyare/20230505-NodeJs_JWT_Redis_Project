const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const colors = require('colors');
const { createUser, createUserBody, deleteUser } = require("./users");


// Basic Meta Informations about our API
const options = {
    definition: {
        openapi: "3.0.0",
        info: { 
            title: "JWT Refresh-Token-NodeJs-MongoDB API",
            version: "1.0.0",
            description:
            "This is an Open Source CRUD API application built with | Nodejs, Express, Redis Mongodb and made with developer experience first; Prettier and VSCode setup available, documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Fenton Miyare",
                url: "https://fentonmiyare.herokuapp.com",
                email: "fmiyare@gmail.com",
            },
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: 'Local Server',
            },
            {
                url: 'https://api.mysite.com',
                description: 'Production Server',
            },
        ],
        tags: [
            {
                name: 'Roles',
            },
            {
                name: 'Users',
            },
        ],
    },
    paths: {
        users: {
            post: createUser,
        },
        'users/{id}': {
            delete: deleteUser,
        },
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
        schemas: {
            createUserBody,
        },
    },
    apis: [
        "./routes/v1/admin.routes.js",
        "./routes/v1/auth.routes.js",
        "./routes/v1/user.routes.js",
        "./routes/v1/order.routes.js",
        "./config/dbConnect.js",
        "./models/index.js"
    ],
};

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

// Function to setup our docs
const swaggerDocs = (app, port) => {
  // Route-Handler to visit our docs
  app.use("/api/v1/docs", swaggerUi.serve, /*swaggerUi.setup(swaggerSpec)),*/ swaggerUi.setup(swaggerSpec, { explorer: true }));
  // Make our docs in JSON format available
  app.get("/api/v1/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(
    `Version 1 Docs are available on http://localhost:${port}/api/v1/docs`.bgRed
  );
};

module.exports = { swaggerDocs };