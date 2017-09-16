var express = require('express');
var router = express.Router();

var hotelsCtrl = require('../controllers/hotels.controllers.js');

router
  .route('/hotels')
  .get(hotelsCtrl.getAllHotels);

module.exports = router;