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
 *                 example: 283
 *               comment:
 *                 type: string
 *               date:
 *                 type: string
 *                 example: 2023-10-04
 *               income:
 *                 type: boolean
 *                 example: false
 *               category:
 *                 type: string
 *                 example: Main expenses
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
 *                   example: false
 *                 amount:
 *                   type: integer
 *                   example: 283
 *                 category:
 *                   type: string
 *                   example: Main expenses
 *                 comment:
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
 *       '400':
 *         description: Body failed validation check.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error message.
 *                 code:
 *                   type: integer
 *                   example: 400
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

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all transactions belonging to the user.
 *     description:  Get all transactions belonging to the user.
 *     responses:
 *       '201':
 *         description: Transactions successfully sent to client. statiststic.balance represents user's overall balance.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statistics:
 *                   type: object
 *                   properties:
 *                     incomeSum:
 *                       type: integer
 *                       example: 0
 *                     expenseSum:
 *                       type: integer
 *                       example: 2250
 *                     balance:
 *                       type: integer
 *                       example: -2250
 *                     expenseStatistics:
 *                       type: object
 *                       properties:
 *                         Main expenses:
 *                           type: integer
 *                           example: 0
 *                         Products:
 *                           type: integer
 *                           example: 0
 *                         Car:
 *                           type: integer
 *                           example: 0
 *                         Self care:
 *                           type: integer
 *                           example: 0
 *                         Household products:
 *                           type: integer
 *                           example: 0
 *                         Education:
 *                           type: integer
 *                           example: 0
 *                         Leisure:
 *                           type: integer
 *                           example: 2250
 *                       period:
 *                         type: string
 *                         example: allTime
 *                 transactions:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: integer
 *                       example: 10
 *                     data:
 *                       type: array
 *                       items:
 *                          type: object
 *       '400':
 *         description: There are no transactions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: There are no transactions. Bad request.
 *                 code:
 *                   type: integer
 *                   example: 400
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

/**
 * @swagger
 * /api/transactions/:transactionId:
 *   get:
 *     summary: Get specific trsansaction based on its id.
 *     description: Get specific trsansaction based on its id.
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *           example: 652066235a8c495860f6462f
 *           description: Transaction id
 *     responses:
 *       '201':
 *         description: Requested transaction sent back to client.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 income:
 *                   type: boolean
 *                   example: false
 *                 amount:
 *                   type: integer
 *                   example: 283
 *                 category:
 *                   type: string
 *                   example: Main expenses
 *                 comment:
 *                   type: string
 *                 date:
 *                   type: string
 *                   example: 2023-10-04T00:00:00.000Z
 *                 owner:
 *                   type: string
 *                   example: 65218dd28c2649602207d72d
 *                 _id:
 *                   type: string
 *                   example: 652066235a8c495860f6462f
 *                 __v:
 *                   type: integer
 *                   example: 0
 *       '400':
 *         description: No transaction with such id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No transaction with such id. Bad request.
 *                 code:
 *                   type: integer
 *                   example: 400
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

router.get("/:transactionId", authenticate, getTransactionById);

/**
 * @swagger
 * /api/transactions/:transactionId:
 *   delete:
 *     summary: Delete specific trsansaction based on its id.
 *     description: Delete specific trsansaction based on its id.
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *           example: 652066235a8c495860f6462f
 *           description: Transaction id
 *     responses:
 *       '201':
 *         description: Requested transaction deleted. Returns deleted document.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 income:
 *                   type: boolean
 *                   example: false
 *                 amount:
 *                   type: integer
 *                   example: 283
 *                 category:
 *                   type: string
 *                   example: Main expenses
 *                 comment:
 *                   type: string
 *                 date:
 *                   type: string
 *                   example: 2023-10-04T00:00:00.000Z
 *                 owner:
 *                   type: string
 *                   example: 65218dd28c2649602207d72d
 *                 _id:
 *                   type: string
 *                   example: 652066235a8c495860f6462f
 *                 __v:
 *                   type: integer
 *                   example: 0
 *       '400':
 *         description: No transaction with such id. Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No transaction with such id. Bad request.
 *                 code:
 *                   type: integer
 *                   example: 400
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
router.delete("/:transactionId", authenticate, deleteTransaction);

/**
 * @swagger
 * /api/transactions/:transactionId:
 *   put:
 *     summary: Update transaction details.
 *     description: Update transaction details.
 *     parameters:
 *       - in: path
 *         name: transactionId
 *         required: true
 *         schema:
 *           type: string
 *           example: 652066235a8c495860f6462f
 *           description: Transaction id
 *     requestBody:
 *       required: true
 *       description: At least one of the fields in request body is required.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: integer
 *                 example: 283
 *               comment:
 *                 type: string
 *               date:
 *                 type: string
 *                 example: 2023-10-04
 *               income:
 *                 type: boolean
 *                 example: false
 *               category:
 *                 type: string
 *                 example: Main expenses
 *     responses:
 *       '201':
 *         description: Requested transaction has been updated. Returns updated document.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 income:
 *                   type: boolean
 *                   example: false
 *                 amount:
 *                   type: integer
 *                   example: 283
 *                 category:
 *                   type: string
 *                   example: Main expenses
 *                 comment:
 *                   type: string
 *                 date:
 *                   type: string
 *                   example: 2023-10-04T00:00:00.000Z
 *                 owner:
 *                   type: string
 *                   example: 65218dd28c2649602207d72d
 *                 _id:
 *                   type: string
 *                   example: 652066235a8c495860f6462f
 *                 __v:
 *                   type: integer
 *                   example: 0
 *       '400':
 *         description: No transaction with such id or body failed validation check. Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No transaction with such id. Bad request.
 *                 code:
 *                   type: integer
 *                   example: 400
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

router.put(
  "/:transactionId",
  authenticate,
  validatedBodyPut,
  updateTransaction
);

/**
 * @swagger
 * /api/transactions/statistics/:month:
 *   get:
 *     summary: Check statistic or given month.
 *     description: Check statistic or given month.
 *     parameters:
 *       - in: path
 *         name: month
 *         required: true
 *         schema:
 *           type: string
 *           example: 2023-10
 *           description: Requested month of statistics.
 *     responses:
 *       '201':
 *         description: Transactions successfully sent to client. Array with transaction obejcts in transactions.data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statistics:
 *                   type: object
 *                   properties:
 *                     incomeSum:
 *                       type: integer
 *                       example: 0
 *                     expenseSum:
 *                       type: integer
 *                       example: 2250
 *                     balance:
 *                       type: integer
 *                       example: -2250
 *                     expenseStatistics:
 *                       type: object
 *                       properties:
 *                         Main expenses:
 *                           type: integer
 *                           example: 0
 *                         Products:
 *                           type: integer
 *                           example: 0
 *                         Car:
 *                           type: integer
 *                           example: 0
 *                         Self care:
 *                           type: integer
 *                           example: 0
 *                         Household products:
 *                           type: integer
 *                           example: 0
 *                         Education:
 *                           type: integer
 *                           example: 0
 *                         Leisure:
 *                           type: integer
 *                           example: 2250
 *                       period:
 *                         type: string
 *                         example: allTime
 *                 transactions:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: integer
 *                       example: 10
 *                     data:
 *                       type: array
 *                       items:
 *                          type: object
 *       '400':
 *         description: There are no transactions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: There are no transactions. Bad request.
 *                 code:
 *                   type: integer
 *                   example: 400
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

router.get("/statistics/:month", authenticate, getStatisticsByMonth);

module.exports = router;
