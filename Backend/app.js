const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const orderRoutes = require('./routes/orders');
const productRoutes = require('./routes/products');

const Product = require('./models/products');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mydatabase')
.then(() => console.log('successfully connected'))
.catch((error) => console.error(error));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });

  

app.use('/api/orders',orderRoutes);
app.use('/api/products',productRoutes);

module.exports = app;