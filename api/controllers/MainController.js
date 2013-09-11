/**
 * MainController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {
	/**
	* INDEX
	*
	*/
  index: function (req, res) {
          res.view();
    },
	/**
	* SIGN-UP
	*
	*/
	signup: function (req, res) {
		var username = req.param("username");
		var password = req.param("password");
		console.log('signing-in '+username+"/"+password);
		Users.findByUsername(username).done(function(err, usr){
			if (err) {
				console.log('find - DB Error');
				res.send(500, { error: "DB Error" });
			} else if (usr.length > 0) {
				console.log('user already exists '+JSON.stringify(usr));
				res.send(400, {error: "Username already Taken"});
			} else {
				var hasher = require("password-hash");
				password = hasher.generate(password);
				console.log('user creation');	
				Users.create({username: username, password: password}).done(function(error, user) {
								if (error) {
									console.log('create - DB error');
									res.send(500, {error: "DB Error"});
								} else {
									req.session.user = user;
									console.log('creation done : '+user.username);
									res.send(user);
								}
							});
			}
		});
	},
	/**
	* LOGIN
	*
	*/
    login: function (req, res) {
    var username = req.param("username");
    var password = req.param("password");
    console.log('logging-in '+username+"/"+password);
    Users.findByUsername(username).done(function(err, usr) {
        if (err) {
			console.log('find - DB Error');
            res.send(500, { error: "DB Error" });
        } else {
            if (usr && usr.length > 0) {
				console.log('verifying password hash');
                var hasher = require("password-hash");
				var user = usr[0];	
                if (hasher.verify(password, user.password)) {
					console.log('password OK');
                    req.session.user = user;
                    res.send(usr);
                } else {
					console.log('password check KO');
                    res.send(400, { error: "Wrong Password" });
                }
            } else {
				console.log('user not found');
                res.send(404, { error: "User not Found" });
            }
        }
    });
},
	/**
	* CHAT
	*
	*/
    chat: function (req, res) {
		if (req.session.user) {
			res.view({username: req.session.user.username});
		} else {
			res.redirect('/');
		}
	}
  

};
