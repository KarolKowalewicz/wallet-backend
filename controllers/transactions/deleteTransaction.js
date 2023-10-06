const Transaction = require("../../models/transaction");

const deleteTransaction = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const response = await Transaction.findByIdAndDelete(transactionId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: "Server error.",
      error: error,
    });
  }
};

module.exports = { deleteTransaction };
