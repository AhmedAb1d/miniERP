const express =  require('express');

const Ctrl = require('../controllers/orders');

var router = express.Router();

router.get('/',Ctrl.getOrders);

module.exports = router;