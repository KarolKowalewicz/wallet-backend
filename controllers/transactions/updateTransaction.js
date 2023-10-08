const Transaction = require("../../models/transaction");

const updateTransaction = async (req, res) => {
  const body = req.body;
  const userId = req.user._id;

  const { transactionId } = req.params;
  try {
    const response = await Transaction.findByIdAndUpdate(
      { _id: transactionId, owner: userId },
      { $set: body },
      { new: true }
    );
    if (response === null) {
      return res
        .status(400)
        .json({ message: "No transaction with such id. Bad request." });
    }
    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({
      message: "Server error.",
      error: error,
    });
  }
};

module.exports = { updateTransaction };
