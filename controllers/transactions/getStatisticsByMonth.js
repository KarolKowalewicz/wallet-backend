const Transaction = require("../../models/transaction");
const convertDateForNextMonth = require("../../helperFunctions/convertDateForNextMonth");
const prepareStatistics = require("../../helperFunctions/prepareStatistics");

const getStatisticsByMonth = async (req, res) => {
  const userId = req.user._id;
  const searchedMonth = new Date(req.params.month).toISOString();
  const nextMonth = convertDateForNextMonth(searchedMonth);

  const response = await Transaction.find({
    date: { $gte: searchedMonth, $lt: nextMonth },
    owner: userId,
  });
  // if (response.length === 0) {
  //   return res
  //     .status(400)
  //     .json({ message: "There are no tranactions for this month." });
  // }
  const statistics = prepareStatistics(response);
  statistics.statistics.period = req.params.month;

  return res.status(200).json(statistics);
};

module.exports = { getStatisticsByMonth };
