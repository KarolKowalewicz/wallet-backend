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

  arrayOfAllTransactions.sort((a, b) => {
    return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
  });

  arrayOfAllTransactions.forEach((element) => {
    if (element.income) {
      incomeSum += element.amount;
    }
    if (!element.income) {
      expenseStatistics[element.category] += element.amount;
      expenseSum += element.amount;
    }
  });

  const balance = incomeSum - expenseSum;
  const transactionCount = arrayOfAllTransactions.length;
  const result = {
    statistics: {
      incomeSum: incomeSum,
      expenseSum: expenseSum,
      balance: balance,
      expenseStatistics: expenseStatistics,
    },
    transactions: { count: transactionCount, data: arrayOfAllTransactions },
  };
  return result;
};

module.exports = prepareStatistics;
