require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require('celebrate');
const routes = require("./routes");
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  // Connection successful
})
.catch(() => {
  process.exit(1);
});

app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://jc-wtwr.crabdance.com', 'https://www.jc-wtwr.crabdance.com'],
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // Server started successfully
}).on('error', () => {
  process.exit(1);
});
