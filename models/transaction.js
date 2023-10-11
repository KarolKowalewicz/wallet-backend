/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       properties:
 *         amount:
 *           type: integer
 *           example: 135
 *         comment:
 *           type: string
 *         date:
 *           type: string
 *           description: Date should be ISO 8601 format, e.g. 2023-10-06
 *         income:
 *           type: boolean
 *           example: false
 *           description: True for income transactions, false for expenses.
 *         category:
 *           type: string
 *           example: Leisure
 *           description: Optional, must be used only when income is false.
 *           enum:
 *             - Main expenses
 *             - Products
 *             - Car
 *             - Self care
 *             - Child care
 *             - Household products
 *             - Education
 *             - Leisure
 *             - Other expenses
 *             - Entertainment
 */

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const transactionSchema = new Schema({
  income: {
    type: Boolean,
    required: [true, "Income information is required"],
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
  },
  category: {
    type: String,
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
  comment: {
    type: String,
    required: [true, "Comment is required"],
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: [true, "Owner information is required"],
  },
});

const Transaction = model("transaction", transactionSchema);

module.exports = Transaction;
