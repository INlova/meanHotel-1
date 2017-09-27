var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
<<<<<<< HEAD
	username : {
		type : String,
		unique : true,
		required: true
	},
	name : {
		type : String
	},
	password : {
		type : String,
		required : true
	}
});

mongoose.model('User', userSchema);
=======
    username: {
        type: String,
        unique: true,
        required : true
    },
    name: {
        type:String

    },
    password: {
        type: String,
        required:true
    }
});

mongoose.model('User', userSchema);
>>>>>>> Hotel APP: Finished adding the last pieces to the base boilerplate hotel application.
