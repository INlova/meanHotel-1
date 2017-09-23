var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

module.exports.getAllReviews = function (req, res) {
	var hotelId = req.params.hotelId;
	Hotel
	  .findById(hotelId)
	  .select('reviews')
	  .exec(function (err, doc) {
	  	console.log("Returning document", doc);
	  	res
		  .status(200)
		  .json(doc.reviews);
	  });

};

module.exports.getReview = function (req, res) {
	var hotelId = req.params.hotelId;
	var reviewId = req.params.reviewId;
	console.log("GET reviewId: "+reviewId+" with hotelId: "+hotelId);
	Hotel
	  .findById(hotelId)
	  .select('reviews')
	  .exec(function (err, hotel) {
	  	console.log("Returning hotel", hotel);
	  	var review = hotel.reviews.id(reviewId);
	  	res
		  .status(200)
		  .json(review);
	  });
};