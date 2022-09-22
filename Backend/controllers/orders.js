const orders = require('../data/orders');

exports.getOrders = (req,res) => {
    res.status(200).json(orders);
}
