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
const {
  validatedBodyPost,
  validatedBodyPut,
} = require("../../middleware/validationTransaction");

//validation to be done

const router = express.Router();

//@ GET getCategories http://localhost:4040/api/transactions/categories
//@ POST addTransaction http://localhost:4040/api/transactions
//@ GET getAllTransactions http://localhost:4040/api/transactions
//@ GET getTransactionById http://localhost:4040/api/transactions/:transactionId
//@ DELETE deleteTransaction http://localhost:4040/api/transactions/:transactionId
//@ PUT updateTransaction http://localhost:4040/api/transactions/:transactionId
//@ GET getStatisticsByMonth http://localhost:4040/api/transactions

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Add new transaction.
 *     description: Add new transaction. Category must be sent only when income is set to false - category is meant only for expenses. Date needs to be provided in ISO 8601 format, for example 2023-10-08.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: integer
 *                 example: 135
 *               comment:
 *                 type: string
 *               date:
 *                 type: string
 *                 example: 2023-10-05
 *               income:
 *                 type: boolean
 *                 example: false
 *               category:
 *                 type: string
 *                 example: Leisure
 *     responses:
 *       '201':
 *         description: Transaction successfully added.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 income:
 *                   type: boolean
 *                   example: true
 *                 amount
 *                   type: integer
 *                   example: 283
 *                 comment
 *                   type: string
 *                 date:
 *                   type: string
 *                   example: 2023-10-04T00:00:00.000Z
 *                 owner:
 *                   type: string
 *                   example: 65218dd28c2649602207d72d
 *                 _id:
 *                   type: string
 *                   example: 6521d6205d23f3d86f9d6e4b
 *                 __v:
 *                   type: integer
 *                   example: 0
 *       '401':
 *         description: Unauthorized. User not authorized.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: integer
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: Not authorized
 *       '500':
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error.
 */

router.post("/", authenticate, validatedBodyPost, addTransaction);

router.get("/", authenticate, getAllTransactions);
/**
 * @swagger
 * /api/transactions/categories:
 *   get:
 *     summary: Get all categories of expenses accepted by api.
 *     description: Get all categories of expenses accepted by api. Does not require authentification.
 *     responses:
 *       '200':
 *         description: Array of categories is sent back from api.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["Main expenses", "Products", "Car", "Self care", "Household products", "Education", "Leisure"]
 *
 *       '500':
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   enum: [Server error]
 */
router.get("/categories", getCategories);

router.get("/:transactionId", authenticate, getTransactionById);

router.delete("/:transactionId", authenticate, deleteTransaction);

router.put(
  "/:transactionId",
  authenticate,
  validatedBodyPut,
  updateTransaction
);
router.get("/statistics/:month", authenticate, getStatisticsByMonth);

module.exports = router;
