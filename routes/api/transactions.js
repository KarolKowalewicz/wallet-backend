const express = require("express");
const Transaction = require("../../models/transaction");
const { authenticate } = require("../../middleware/authenticate");
const {
  getCategories,
  addTransaction,
  getAllTransactions,
  getTransactionById,
  deleteTransaction,
  getStatisticsByMonth,
  updateTransaction,
} = require("../../controllers/transactions");

//validation to be done

const router = express.Router();

//@ GET getCategories http://localhost:4040/api/transactions/categories
router.get("/categories", getCategories);
//@ POST addTransaction http://localhost:4040/api/transactions
router.post("/", authenticate, addTransaction);
//@ GET getAllTransactions http://localhost:4040/api/transactions
router.get("/", authenticate, getAllTransactions);
//@ GET getTransactionById http://localhost:4040/api/transactions/:transactionId
router.get("/:transactionId", authenticate, getTransactionById);
//@ DELETE deleteTransaction http://localhost:4040/api/transactions/:transactionId
router.delete("/:transactionId", authenticate, deleteTransaction);
//@ PUT updateTransaction http://localhost:4040/api/transactions/:transactionId
router.put("/:transactionId", authenticate, updateTransaction);
//@ GET getStatisticsByMonth http://localhost:4040/api/transactions
router.get("/statistics/:month", authenticate, getStatisticsByMonth);

module.exports = router;
