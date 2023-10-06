const express = require("express");
const Transaction = require("../../models/transaction");
const { route } = require("./users");
// const { authenticate } = require("../../middleware/authenticate");
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
router.post("/", addTransaction);
router.get("/", getAllTransactions);
router.get("/:transactionId", getTransactionById);
router.delete("/:transactionId", deleteTransaction);
router.put("/:transactionId", updateTransaction);
router.get("/statistics/:month", getStatisticsByMonth);

module.exports = router;
