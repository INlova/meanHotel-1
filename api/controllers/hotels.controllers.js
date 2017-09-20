// seperate instance of the connection but has the same state and got the connection
var dbConnection = require('../data/dbConnection.js');
var hotelData = require('../data/hotel-data.json');

module.exports.getAllHotels = function(req, res) {

	var db = dbConnection.get();
	
	console.log("db", db);

	console.log("GET the hotels");
	console.log(req.query);

	var offset = 0;
	var count = 5;

	if (req.query && req.query.offset) {
		offset = parseInt(req.query.offset, 10);
	}

	if (req.query && req.query.count) {
		count = parseInt(req.query.count, 10);
	}

	var returnData = hotelData.slice(offset, offset+count);

	res
	  .status(200)
	  .json(returnData);
};

module.exports.getHotel = function(req, res) {
	var hotelId = req.params.hotelId
	var hotel = hotelData[hotelId];
	console.log("GET hotelId", hotelId);
	res
	  .status(200)
	  .json(hotel);
};

module.exports.addHotel = function(req, res) {
	console.log("POST new Hotel");
	console.log(req.body);
	res
	  .status(200)
	  .json(req.body);
};