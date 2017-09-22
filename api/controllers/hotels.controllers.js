// seperate instance of the connection but has the same state and got the connection
var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

module.exports.getAllHotels = function(req, res) {

	var offset = 0;
	var count = 5;

	//limit method returns the number of documents to be returned
	//skip method returns how many document to skip before returning a result

	if (req.query && req.query.offset) {
		offset = parseInt(req.query.offset, 10);
	}

	if (req.query && req.query.count) {
		count = parseInt(req.query.count, 10);
	}

	Hotel
	  .find()
	  .skip(offset)
	  .limit(count)
	  .exec(function(err, hotels) {
	  	console.log("Found hotels", hotels.length);
	  	res.json(hotels);
	  });
};

module.exports.getHotel = function(req, res) {
	var hotelId = req.params.hotelId;
	console.log("GET hotelId", hotelId);

	Hotel
	  .findById(hotelId)
	  .exec(function (err, doc) {
	  	res
		  .status(200)
		  .json(doc);
	  });
};

module.exports.addHotel = function(req, res) {
	var db = dbConnection.get();
	var collection = db.collection('hotels');
	var newHotel;

	console.log("POST new Hotel");

	if (req.body && req.body.name && req.body.stars) {
		newHotel = req.body;
		newHotel.stars = parseInt(req.body.stars, 10);
		collection.insertOne(newHotel, function(err, response) {
			console.log(response.ops);
			res
			  .status(200)
			  .json(response.ops);
		});
	}
	
};