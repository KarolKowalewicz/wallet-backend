const getCategories = (_, res) => {
  return res
    .status(200)
    .json([
      "Main expenses",
      "Products",
      "Car",
      "Self care",
      "Household products",
      "Education",
      "Leisure",
    ]);
};
module.exports = { getCategories };
