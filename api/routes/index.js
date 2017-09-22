var express = require('express');
var router = express.Router();

var hotelsCtrl = require('../controllers/hotels.controllers.js');
var reviewsCtrl = require('../controllers/reviews.controllers.js');
router
  .route('/hotels')
  .get(hotelsCtrl.getAllHotels);

router
  .route('/hotels/:hotelId')
  .get(hotelsCtrl.getHotel);

router
  .route('/hotels/:hotelId/reviews')
  .get(hotelsCtrl.getHotel);

/***** Review routes *****/
router
  .route('/hotels/:hotelId/reviews')
  .get(reviewsCtrl.getAllReviews);

router
  .route('/hotels/:hotelId/reviews/:reviewId')
  .get(reviewsCtrl.getReview);

module.exports = router;