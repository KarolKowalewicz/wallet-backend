const swaggerJsdoc = require("swagger-jsdoc");
const fs = require("fs");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Wallet App API",
      version: "1.0.0",
    },
  },
  servers: [
    {
      url: "https://young-ocean-87586-3686e0530b3d.herokuapp.com/",
      description: "Production server",
    },
    { url: "http://localhost:4040", description: "Local development server" },
  ],
  apis: ["./routes/api/*.js", "./controllers/users/*.js", "./models/*.js"],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      User: {
        type: "object",
        required: ["email", "password", "name"],
        properties: {
          email: {
            type: "string",
            description: "User's email address",
          },
          password: {
            type: "string",
            description: "User's password (hashed)",
          },
          name: {
            type: "string",
            description: "User's name",
          },
          token: {
            type: "string",
            description: "JWT token associated with the user (optional)",
          },
        },
      },
      Transaction: {
        type: "object",
        required: ["amount", "comment", "date", "income"],
        properties: {
          amount: { type: "integer", description: "User's email address" },
          comment: { type: "string", description: "User's email address" },
          date: {
            type: "string",
            description: "Date should be ISO 8601 format, e.g. 2023-10-06.",
          },
          income: {
            type: "boolean",
            description: "True for income transactions, false for expenses.",
          },
          category: {
            type: "string",
            description: "Optional, must be used only when income is false.",
            enum: [
              "Main expenses",
              "Products",
              "Car",
              "Self care",
              "Child care",
              "Household products",
              "Education",
              "Leisure",
              "Other expenses",
              "Entertainment",
            ],
          },
        },
      },
    },
  },
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
try {
  fs.writeFileSync("./docs/swagger.json", JSON.stringify(swaggerSpec));
} catch (err) {
  console.error(err);
}
module.exports = swaggerSpec;
