const Transaction = require("../../models/transaction");

const getAllTransactions = async (_, res) => {
  try {
    const response = await Transaction.find();
    response.sort((a, b) => {
      return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
    });
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error.",
      error: error,
    });
  }
};

module.exports = { getAllTransactions };
