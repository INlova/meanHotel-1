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

var splitArray = function (input) {
	var output;
	if (input && input.length > 0) {
		output = input.split(";");
	} else {
		output = [];
	}
	return output;
};

module.exports.addHotel = function(req, res) {
	Hotel
	  .create({
	  	name : req.body.name,
	  	description : req.body.description,
	  	stars : parseInt(req.body.stars),
	  	services : splitArray(req.body.services),
	  	photos : req.body.photos,
	  	currency : req.body.currency,
	  	location : {
	  		address : req.body.address,
	  		coordinates : [parseFloat(req.body.lng), parseFloat(req.body.lat)]
	  	}
	  }, function(err, hotel) {
	  	if (err) {
			console.log("Error creating hotel.");
			res
			  .status(400)
			  .json(err)
		} else {
			console.log("Created hotel", hotel);
			res
			  .status(201)
			  .json(hotel);
		}
	  
	 });
};
