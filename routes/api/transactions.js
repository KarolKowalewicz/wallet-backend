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

router.get("/categories", getCategories);
router.post("/", authenticate, addTransaction);
router.get("/", authenticate, getAllTransactions);
router.get("/:transactionId", authenticate, getTransactionById);
router.delete("/:transactionId", authenticate, deleteTransaction);
router.put("/:transactionId", authenticate, updateTransaction);
router.get("/statistics/:month", authenticate, getStatisticsByMonth);

module.exports = router;
