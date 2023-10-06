const Transaction = require("../../models/transaction");
const convertDateForNextMonth = require("../../helperFunctions/convertDateForNextMonth");

const getStatisticsByMonth = async (req, res) => {
  const searchedMonth = new Date(req.params.month).toISOString();
  const nextMonth = convertDateForNextMonth(searchedMonth);
  const response = await Transaction.find({
    date: { $gte: searchedMonth, $lt: nextMonth },
  });
  if (response.length === 0) {
    return res
      .status(400)
      .json({ message: "There are no tranactions for this month." });
  }
  return res.status(200).json({ message: response });
};

module.exports = { getStatisticsByMonth };
