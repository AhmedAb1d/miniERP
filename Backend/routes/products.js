const express =  require('express');

const Ctrl = require('../controllers/products');

var router = express.Router();

router.get('/',Ctrl.getProducts);
router.post('/',Ctrl.createProduct);

module.exports = router;