const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.json());

dotenv.config({ path: './config/.env' });

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS,GET,POST,PUT,PATCH,DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type',
    'Authorization'
  );
  next();
});

const studentRouter = require('./router/students');
const adminRouter = require('./router/admin');

app.use('/', studentRouter);
app.use('/admin', adminRouter);

app.use((error, req, res, next) => {
  const data = error.data;
  const message = error.message;
  const status = error.status || 500;
  res.status(status).json({ message: message, data: data });
  next();
});

mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    app.listen(process.env.PORT, (req, res, next) => {
      console.log(`Server is Running at PORT ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
