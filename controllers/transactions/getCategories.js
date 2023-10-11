const getCategories = (_, res) => {
  return res
    .status(200)
    .json([
      "Main expenses",
      "Products",
      "Car",
      "Self care",
      "Child care",
      "Household products",
      "Education",
      "Leisure",
      "Other expenses",
      "Entertainment",
    ]);
};
module.exports = { getCategories };
