var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports.register = function (req, res) {
<<<<<<< HEAD
	console.log('registering user');

	var username = req.body.username;
	var name = req.body.name || null;
	var password = req.body.password;

	User.create({
		username : username,
		name : name,
		password : bcrypt.hashSync(password, bcrypt.genSaltSync(10))
	}, function (err, user) {
		if (err) {
			console.log(err);
			res.status(400).json(err);
		} else {
			console.log('user created', user);
			res.status(201).json(user);
		}
	});
};

module.exports.login = function (req, res) {
	console.log('logging in user');
	var username = req.body.username;
	var password = req.body.password;

	User.findOne({
		username : username
	}).exec(function(err, user) {
		if (err) {
			console.log(err);
			res.status(400).json(err);
		} else {
			if (bcrypt.compareSync(password, user.password)) {
				console.log('User found', user);
				var token = jwt.sign(
					{username : user.username},
					's3cr3t', //secret key
					{expiresIn: 3600}
				); //sign a token
				res.status(200).json({success: true, token: token});
			} else {
				res.status(401).json('Unauthorized Access');
			}				
		}
	});
};

module.exports.authenticate = function (req, res, next) {
	var headerExists = req.headers.authorization;
	if (headerExists) {
		var token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, 's3cr3t', function(err, decoded) {
			if (err) {
				console.log(err);
				res.status(401).json('Unauthorized');
			} else {
				req.user = decoded.username;
				next();
			}
		});
	} else {
		res.status(403).json('No token provided');
	}
};
=======
    console.log('registering user');
    var username = req.body.username;
    var name = req.body.name || null;
    var password = req.body.password;

    User.create({
        username: username,
        name: name,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    }, function (err, user) {
        if (err) {
            res
                .status(400)
                .json(err);
        } else {
            console.log('User created', user);
            res
                .status(201)
                .json(user);
        }
    })
};

module.exports.login = function (req, res) {
    console.log('logging in user');
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({
        username: username
    }).exec(function (err, user) {
        if (err) {
            res
                .status(400)
                .json(err);
        } else {
            if (bcrypt.compareSync(password, user.password)) {
                console.log('user found', user.username);
                //generate token for user
                var token = jwt.sign({//payload
                        username: user.username
                    }, //a secret
                    's3cr3t', {expiresIn: 3600});
                res
                    .status(200)
                    .json({success: true, token: token});
            } else {
                if (err) {
                    console.log('unauthorized')
                }
                res
                    .status(401)
                    .json(err);
            }
        }
    });
};

module.exports.authenticate = function (req, res, next) { //next wordt een methode
    //express js middleware: function met access tot req,res en kan code executeren/objecten veranderen binnenin
    //of het stoppen van de transactie

    //make sure you have a authorization header
    var headerExists = req.headers.authorization;
    if (headerExists) {
        var token = req.headers.authorization.split(' ')[1];//zo ziet de header er uit → Authorization Bearer xxx (xxx is token)
        jwt.verify(token, 's3cr3t', function (error, decoded) {
            if (error) {
                console.log(error);
                res
                    .status(401).json('Unauthorized');
            }else{
                req.user = decoded.username;

                next();
            }
        });
    } else {
        res.status(403).json('No token provided');
    }
};
>>>>>>> Hotel APP: Finished adding the last pieces to the base boilerplate hotel application.
