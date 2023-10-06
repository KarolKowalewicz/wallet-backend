const add = require("date-fns/add");

const convertDateForNextMonth = (date) => {
  return add(new Date(date), { years: 0, months: 1 });
};

module.exports = convertDateForNextMonth;
