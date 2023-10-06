const Transaction = require("../../models/transaction");

const updateTransaction = async (req, res) => {
  const body = req.body;
  const { transactionId } = req.params;
  try {
    const response = await Transaction.findByIdAndUpdate(
      { _id: transactionId },
      { $set: body },
      { new: true }
    );
    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({
      message: "Server error.",
      error: error,
    });
  }
};

module.exports = { updateTransaction };
