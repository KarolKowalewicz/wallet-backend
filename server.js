const app = require('./app')


require('dotenv').config();

const PORT = process.env.PORT || 4040;


app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });