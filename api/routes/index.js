var express = require('express');
var router = express.Router();

var hotelsCtrl = require('../controllers/hotels.controllers.js');
var reviewsCtrl = require('../controllers/reviews.controllers.js');
router
  .route('/hotels')
  .get(hotelsCtrl.getAllHotels)
  .post(hotelsCtrl.addHotel);

router
  .route('/hotels/:hotelId')
  .get(hotelsCtrl.getHotel)
  .put(hotelsCtrl.updateHotel)
  .delete(hotelsCtrl.deleteHotel);

/***** Review routes *****/
router
  .route('/hotels/:hotelId/reviews')
  .get(reviewsCtrl.getAllReviews)
  .post(reviewsCtrl.addReview);

router
  .route('/hotels/:hotelId/reviews/:reviewId')
  .get(reviewsCtrl.getReview)
  .put(reviewsCtrl.updateReview)
  .delete(reviewsCtrl.deleteReview);

module.exports = router;