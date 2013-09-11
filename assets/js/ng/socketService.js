getSocket = function($rootScope) {
		var $socket;
		$socket = io.connect("http://localhost:1336");
		$socket.on("connect", function(stream) {
			console.log("someone connected!");
	
			$socket.on('connectedUsers', function(data) {
				console.log("connected users: ", data);
				return $rootScope.$apply(function() {
					return $rootScope.connectedUsers = data;
				});
			});


			$socket.on("setAll", function(data) {				      								
				return $rootScope.$apply(function() {
					contact = data.contact;		
					//$rootScope.message = '[INIT] '+data.contacts.length+' contacts';
					console.log(data);
					return $rootScope.contacts = data.contacts;
				});
			});

			$socket.on("addContact", function(data) {        										
				return $rootScope.$apply(function() {
					contact = data.contact;		
					//$rootScope.message = '[ADD] :: '+contact.firstName+' '+contact.lastName+ ' / '+contact.phoneNumber;
					console.log(data);
					return $rootScope.contacts = data.contacts;
				});				
			});      

			$socket.on("removeContact", function(data) {												
				return $rootScope.$apply(function() {
					contact = data.contact;
					// $rootScope.message = '[DEL] :: '+contact.firstName+' '+contact.lastName;
					return $rootScope.contacts = data.contacts;
				});
			});
			
			$socket.on("editContact", function(data) {												
				return $rootScope.$apply(function() {
					contact = data.contact;
					// $rootScope.message = '[DEL] :: '+contact.firstName+' '+contact.lastName;
					return $rootScope.contacts = data.contacts;
				});
			});

			$socket.on("disconnect", function(stream) {
				return console.log("someone disconnected");
			});

		});
	
		return $socket;
	}