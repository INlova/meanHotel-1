var hotelData = require('../data/hotel-data.json');

module.exports.getAllHotels = function(req, res) {
	console.log("GET the hotels");
	res
	  .status(200)
	  .json( hotelData );
};

module.exports.getHotel = function(req, res) {
	var hotelId = req.params.hotelId
	var hotel = hotelData[hotelId];
	console.log("GET hotelId", hotelId);
	res
	  .status(200)
	  .json( hotel );
};