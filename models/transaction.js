const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const transactionSchema = new Schema({
  //   income: {
  //     type: Boolean,
  //     required: [
  //       true,
  //       "Information if transaction is in plus or in minus is required.",
  //     ],
  //     // unique: true,
  //   },
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
      "Household products",
      "Education",
      "Leisure",
    ],
    required: [true, "Category is required."],
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
  },
});

const Transaction = model("transaction", transactionSchema);

module.exports = Transaction;
