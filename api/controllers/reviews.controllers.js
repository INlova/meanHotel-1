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

var postReview = function(req, res, hotel) {
	hotel.reviews.push({
		name : req.body.name,
		rating : parseInt(req.body.rating, 10),
		review : req.body.review
	});

	hotel.save (function(err, hotelUpdated) {
		if (err) {
			res
			  .status(500)
			  .json(err);
		} else {
			res
			  .status(201)
			  .json(hotelUpdated.reviews[hotelUpdated.reviews.length -1]);
		}
	});
}

module.exports.addReview = function (req, res) {
	var hotelId = req.params.hotelId;
	Hotel
	  .findById(hotelId)
	  .select('reviews')
	  .exec(function (err, doc) {
	  	var response = {
	  		status : 200,
	  		message : []
	  	};
	  	if (err) {
	  		console.log("Error finding hotel");
	  		response.status = 500;
	  		response.mesasge = err;
	  	} else if (!doc) {
	  		console.log("Hotel id not found", hotelId);
	  		response.status = 404;
	  		reponse.message = {
	  			"message" : "Hotel ID not found. Got(" + hotelId + ")"
	  		};
	  	}
	  	if (doc) {
	  		postReview(req, res, doc);
	  	} else {
	  		console.log("Returning document", doc);
		  	res
			  .status(response.status)
			  .json(response.message);
	  	}
	 });
};