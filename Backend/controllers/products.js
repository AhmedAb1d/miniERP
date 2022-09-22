const Product = require('../models/products');

exports.getProducts = (req,res) => {
    Product.find({})
    .then(
      (prod) => {
        res.status(200).json(prod);
      }
    )
    .catch(
      (error) => {
        console.error(error);
      }
    )
  }

exports.createProduct = (req,res) => {
    Product.create(req.body)
    .then(
      () => res.status(201).json(
        {message: "item created"}
      )
    )
    .catch(
      (error) => res.status(400).json(
        {
          error: error
        }
      )
    );
  }