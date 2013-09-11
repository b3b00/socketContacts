'use strict';

/* Services */
/*
var myApp = angular.module('contacts', []);
//provider style, full blown, configurable version     
myApp.provider('helloWorld', function() {

    this.name = 'Default';

    this.$get = function($rootScope) {
        var name = this.name;
        return {
            sayHello: function() {
                $rootScope.message='bonjour '+name+' ...';
                return "Hello, " + name + "!"
            }
        }
    };

    this.setName = function(name) {
        this.name = name;
    };
});
*/
/*
angular.module('contacts', ['$rootScope'], function($provide) {
  $provide.factory('$socketSvc', function() {
    
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
				console.log("setAll called", data);        								
				return $rootScope.$apply(function() {
					contact = data.contact;		
					$rootScope.message = '[INIT] '+data.contacts.length+' contacts';
					console.log(data);
					return $rootScope.contacts = data.contacts;
				});
			});

			$socket.on("addContact", function(data) {        						
				console.log("addContact called", data);        								
				return $rootScope.$apply(function() {
					contact = data.contact;		
					$rootScope.message = '[ADD] :: '+contact.firstName+' '+contact.lastName+ ' / '+contact.phoneNumber;
					console.log(data);
					return $rootScope.contacts = data.contacts;
				});
				
			});      

			$socket.on("removeContact", function(data) {								
				console.log("removeContact called", data);        
				return $rootScope.$apply(function() {
					contact = data.contact;
					$rootScope.message = '[DEL] :: '+contact.firstName+' '+contact.lastName;
					return $rootScope.contacts = data.contacts;
				});
			});

			$socket.on("disconnect", function(stream) {
				return console.log("someone disconnected");
			});

		});
	
		return $socket;
  });
});

/*
angular.module('contacts', ['$rootScope']).
    factory('$socketService', function($rootScope){
	
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
				console.log("setAll called", data);        								
				return $rootScope.$apply(function() {
					contact = data.contact;		
					$rootScope.message = '[INIT] '+data.contacts.length+' contacts';
					console.log(data);
					return $rootScope.contacts = data.contacts;
				});
			});

			$socket.on("addContact", function(data) {        						
				console.log("addContact called", data);        								
				return $rootScope.$apply(function() {
					contact = data.contact;		
					$rootScope.message = '[ADD] :: '+contact.firstName+' '+contact.lastName+ ' / '+contact.phoneNumber;
					console.log(data);
					return $rootScope.contacts = data.contacts;
				});
				
			});      

			$socket.on("removeContact", function(data) {								
				console.log("removeContact called", data);        
				return $rootScope.$apply(function() {
					contact = data.contact;
					$rootScope.message = '[DEL] :: '+contact.firstName+' '+contact.lastName;
					return $rootScope.contacts = data.contacts;
				});
			});

			$socket.on("disconnect", function(stream) {
				return console.log("someone disconnected");
			});

		});
	
		return $socket;
	}
	);

/* ********************


socketService = function() {
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
				console.log("setAll called", data);        								
				return $rootScope.$apply(function() {
					contact = data.contact;		
					$rootScope.message = '[INIT] '+data.contacts.length+' contacts';
					console.log(data);
					return $rootScope.contacts = data.contacts;
				});
			});

			$socket.on("addContact", function(data) {        						
				console.log("addContact called", data);        								
				return $rootScope.$apply(function() {
					contact = data.contact;		
					$rootScope.message = '[ADD] :: '+contact.firstName+' '+contact.lastName+ ' / '+contact.phoneNumber;
					console.log(data);
					return $rootScope.contacts = data.contacts;
				});
				
			});      

			$socket.on("removeContact", function(data) {								
				console.log("removeContact called", data);        
				return $rootScope.$apply(function() {
					contact = data.contact;
					$rootScope.message = '[DEL] :: '+contact.firstName+' '+contact.lastName;
					return $rootScope.contacts = data.contacts;
				});
			});

			$socket.on("disconnect", function(stream) {
				return console.log("someone disconnected");
			});

		});
	
		return $socket;
	}*/