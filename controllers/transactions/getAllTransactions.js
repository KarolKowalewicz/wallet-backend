const Transaction = require("../../models/transaction");
const prepareStatistics = require("../../helperFunctions/prepareStatistics");

const getAllTransactions = async (req, res) => {
  try {
    const userId = req.user._id;
    const response = await Transaction.find({ owner: userId });

    // if (response.length === 0) {
    //   return res.status(400).json({
    //     message: "There are no transactions. Bad request.",
    //     code: 400,
    //   });
    // }
    const statistics = prepareStatistics(response);
    statistics.statistics.period = "allTime";

    return res.status(200).json(statistics);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error.",
      error: error,
    });
  }
};

module.exports = { getAllTransactions };
