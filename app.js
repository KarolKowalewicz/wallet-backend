
const express = require("express");
const logger = require("morgan");
const cors = require("cors");


const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./docs/swagger.json');
const swaggerSpec = require('./swagger.js');


require("dotenv").config();

const userRouter = require("./routes/api/users");
const transactionsRouter = require("./routes/api/transactions");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";


app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/transactions", transactionsRouter);


// API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.use('/api/users', userRouter);


app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
