const express = require('express');
const cors = require('cors');
const registerRoute = require('./routes/register');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/register', registerRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
