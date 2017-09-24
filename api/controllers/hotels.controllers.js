// seperate instance of the connection but has the same state and got the connection
var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');
var ObjectId = mongoose.mongo.ObjectId;

var runGeoQuery = function (req, res) {
	var lng = parseFloat(req.query.lng);
	var lat = parseFloat(req.query.lat);

	var point = {
	  type : "Point",
	  coordinates : [lng, lat]
	};

	var geoOptions = {
		spherical: true,
		maxDistance : 2000,
		num : 5
	};

	Hotel
	  .geoNear(point, geoOptions, function (err, results, stats) {
	  	console.log('Geo results', results);
	  	console.log('Geo stats', stats);
	  	res
	  	  .status(200)
	  	  .json(results);
	  });
};

module.exports.getAllHotels = function(req, res) {

	var offset = 0;
	var count = 5;
	var maxCount = 10;

	if (req.query && req.query.lat && req.query.lng) {
		runGeoQuery(req, res);
		return;
	}

	//limit method returns the number of documents to be returned
	//skip method returns how many document to skip before returning a result

	if (req.query && req.query.offset) {
		offset = parseInt(req.query.offset, 10);
	}

	if (req.query && req.query.count) {
		count = parseInt(req.query.count, 10);
	}

	if (isNaN(offset) || isNaN(count)) {
		res
		  .status(400)
		  .json({
			"messge" : "Invalid argument supplied. Count or offset values can only be numberic values.",
		  });
		return;
	} else if (count > maxCount) {
		res
		  .status(400)
		  .json({
			"message" : "Count value cannot exceed " + maxCount + ". Got ("+count+")."
		  });
		  return;
	}

	Hotel
	  .find()
	  .skip(offset)
	  .limit(count)
	  .exec(function(err, hotels) {
		if (err) {
			console.log("An error has occured.");
			res
			  .status(500)
			  .json(err)
		} else {
			console.log("Found hotels", hotels.length);
			res.json(hotels);
		}
	 });
};

module.exports.getHotel = function(req, res) {

	/* Validation for casting mongoose object ID before query */
	// if (!(req.params.hotelId.match(/^[a-fA-F0-9]{24}$/))) {
	// 	res
	// 	  .status(500)
	// 	  .json({
	// 		"message" : "Invalid hotel ID provided. Stop playing games"
	// 	  });
	// }

	var hotelId = req.params.hotelId;
	console.log("GET hotelId", hotelId);

	Hotel
	  .findById(hotelId)
	  .exec(function (err, doc) {
		var response = {
			status : 200,
			message : doc
		};

		if(err) {
			console.log("Could not find the hotel with ID " + hotelId);
			response.status = 500;
			response.message = err;
		} else if (!doc) {
			response.status = 404;
			response.message = {
			  "message" : "Hotel ID not found"
			 };
		}
		res
		  .status(response.status)
		  .json(response.message)
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