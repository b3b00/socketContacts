/**
 * ContactsController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */


module.exports = {


 
	/**
	*
	*/
  list: function(req, res) {
    return res.view({});
  },
  
	/**
	*
	*/

};
	 


	 
	




/*
	******************   SOCKETS  *******************

*/  
	  
var io = require('socket.io').listen(1336);

io.sockets.on('connection', function (socket) {
  var numberOfSockets = Object.keys(io.connected).length;
  
  socket.setMaxListeners(0);

  emitContacts('setAll', {}, socket, false);	
  
  
 

  /*
  * [deleteContact]
  */
  socket.on('removeContact', function(contactId){
	console.log("removeContact broadcasted");
	
	console.log('removing id :: '+contactId);
	Contact.findOne(contactId).done(function(err, contact) {
		console.log('error on find('+contactId+') ? '+err);
		// destroy the record
		if (contact != undefined) {
			Contact.publish(null,'DEL Contact ::'+contact.firstName+ ' '+contact.lastName+'::',null);
			contact.destroy(function(err) {
				console.log('error on destroy : '+err);		
				if (err != undefined || err == null) {				
					emitContacts('removeContact', {'contact':contact}, socket);
				}				
			});			
		}		
	});
	
  });

  /*
  * [addContact]
  */
  socket.on('addContact', function(ctct){
	console.log("onUserAdded broadcasted");
	
	Contact.create({
		  firstName: ctct.firstName,
		  lastName: ctct.lastName,
		  phoneNumber: ctct.phoneNumber
		}).done(function(err, contact) {	
			if (err != undefined || err == null) {
				console.log('publishing to websockets : [NEW Contact ::'+contact.firstName+ ' '+contact.lastName+'::]'); 
				console.log(Contact.subscribers());
				emitContacts('addContact', {'contact':contact}, socket);
			}		
			emitContacts('addContact', {'contact':contact}, socket);
		});
  });
  
  /*
  * [editContact]
  */
  socket.on('editContact', function(ctct){
	console.log("onUserEdited broadcasted");
	
	Contact.findOne(ctct.id).done(function(err, contact) {
		console.log('error on find('+ctct.id+') ? '+err);
		// destroy the record
		if (contact != undefined) {
			contact.firstName = ctct.firstName;
			contact.lastName = ctct.lastName;
			contact.phoneNumber = ctct.phoneNumber;
			contact.save(function(err) {
				console.log('error on update : '+err);		
				if (err != undefined || err == null) {				
					emitContacts('editContact', {'contact':contact}, socket);
				}				
			});			
		}		
	});
	
  });

  /*
  * [disconnect]
  */
  socket.on('disconnect', function () {
	socket.emit('connectedUsers', { count: numberOfSockets-1 });
	socket.broadcast.emit('connectedUsers', { count: numberOfSockets-1 });
  });
	
	
	
});


function emitContacts(message, data, socket, broadcast) {		
		broadcast = typeof broadcast !== 'undefined' ? broadcast : true;		
		u = Contact.find().done(function(err, contacts) {
			  // Error handling
			  if (err) {
				data.contacts = [];
				if (broadcast) {
					socket.broadcast.emit(message, data)
				}
				socket.emit(message, data)
			  } else {							
				data.contacts=contacts;
				if (broadcast) {
					socket.broadcast.emit(message, data)
				}
				socket.emit(message, data)
			  }
		});
	}


io.disable('heartbeats');
