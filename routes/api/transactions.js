const express = require("express");
const Transaction = require("../../models/transaction");
// const { authenticate } = require("../../middleware/authenticate");
//validation to be done

const router = express.Router();

//add transaction
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const response = await Transaction.create(req.body);
    return res.status(201).json({ response });
  } catch (error) {
    return res(500).json({
      message: "Server error.",
      error: error,
    });
  }
});

//get all transactions
router.get("/", async (_, res) => {
  try {
    const response = await Transaction.find();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error.",
      error: error,
    });
  }
});

//get transaction by id
router.get("/:transactionId", async (req, res) => {
  const { transactionId } = req.params;

  try {
    const response = await Transaction.findById(transactionId);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error.",
      error: error,
    });
  }
});

//patch transacion

module.exports = router;
