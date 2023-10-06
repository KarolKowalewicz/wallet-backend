const app = require('./app')
const mongoose = require('mongoose');

require('dotenv').config();

const PORT = process.env.PORT || 4040;
const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb, { dbName: "db-wallet" });

connection
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch(err => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  })