const express = require("express");
const router = express.Router();

const{
    getAllStocks, getSortedByDate, getBySpan, getAllStocksVolumeSortBySpan, getAllParamsStockBySpan
} = require('../controllers/stock.js');


router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

router.route("/getStock/stock=:key").get(getAllStocks)
router.route("/getStock/stock=:key/date=:order").get(getSortedByDate)
router.route("/getStock/stock=:key/span=:span").get(getBySpan)
router.route("/getStock/properties/stock=:key/span=:span").get(getAllParamsStockBySpan)
router.route("/getStock/span=:span/volume").get(getAllStocksVolumeSortBySpan)


module.exports = router;