const Transaction = require("../../models/transaction");
const prepareStatistics = require("../../helperFunctions/prepareMonthlyStatistics");

const getAllTransactions = async (req, res) => {
  try {
    const userId = req.user._id;
    const response = await Transaction.find({ owner: userId });
    response.sort((a, b) => {
      return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
    });
    const statictics = prepareStatistics(response);

    return res
      .status(200)
      .json({ statictics: statictics, transactions: response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error.",
      error: error,
    });
  }
};

module.exports = { getAllTransactions };
