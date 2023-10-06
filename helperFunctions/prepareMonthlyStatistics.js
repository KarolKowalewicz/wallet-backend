const prepareStatistics = (arrayOfAllTransactions) => {
  let incomeSum = 0;
  let expenseSum = 0;
  const expenseStatistics = {
    "Main expenses": 0,
    Products: 0,
    Car: 0,
    "Self care": 0,
    "Household products": 0,
    Education: 0,
    Leisure: 0,
  };

  const incomeArray = arrayOfAllTransactions.filter(
    (element) => element.income
  );
  incomeArray.forEach((element) => {
    incomeSum += element.amount;
  });

  const expenseArray = arrayOfAllTransactions.filter(
    (element) => element.category
  );

  expenseArray.forEach((transaction) => {
    expenseStatistics[transaction.category] += transaction.amount;
    expenseSum += transaction.amount;
  });

  const balance = incomeSum - expenseSum;

  const result = {
    incomeSum: incomeSum,
    expenseSum: expenseSum,
    balance: balance,
    expenseStatistics: expenseStatistics,
  };
  return result;
};

module.exports = prepareStatistics;
