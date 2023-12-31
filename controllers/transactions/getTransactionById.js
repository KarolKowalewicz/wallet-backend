const Transaction = require("../../models/transaction");

const getTransactionById = async (req, res) => {
  const { transactionId } = req.params;
  const userId = req.user._id;

  try {
    // const response = await Transaction.findById(transactionId);
    const response = await Transaction.find({
      _id: transactionId,
      owner: userId,
    });

    if (response.length === 0) {
      return res.status(400).json({
        message: "No transaction with such id. Bad request.",
        code: 400,
      });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: "Server error.",
      error: error,
    });
  }
};

module.exports = { getTransactionById };
debugger;
