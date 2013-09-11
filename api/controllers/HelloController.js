/**
 * HelloController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var HelloController = {

    index: function(req, res) {
    res.send("<b style='color:red'>Hello World!<b>");
    },
	
	users : function(req,res) {
	
		User.destroy();
	
		User.create({
		  firstName: 'billy',
		  lastName: 'Bob',
		  userName: 'bilbob'
		}).done(function(err, user) {

		  // Error handling
		  if (err) {
			return console.log(err);

		  // The User was created successfully!
		  }else {
			console.log("User created:", user);
		  }
		});
		
	
		u = User.find().done(function(err, users) {
			  // Error handling
			  if (err) {
				return console.log(err);

			  // Found multiple users!
			  } else {				
				res.send(users);
			  }
			});
		
		//console.log('user found : '+u.firstName+" "+u.lastName+" "+u.userName+" "+u.id);
		
		//res.send('to come...');
	}
}

module.exports = HelloController;
