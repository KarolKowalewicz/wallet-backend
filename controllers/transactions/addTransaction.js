const Transaction = require("../../models/transaction");

const addTransaction = async (req, res) => {
  const userId = req.user._id;
  console.log(userId);
  req.body.owner = userId;

  try {
    const response = await Transaction.create(req.body);
    return res.status(201).json({ response });
  } catch (error) {
    return res.status(500).json({
      message: "Server error.",
    });
  }
};
module.exports = { addTransaction };
