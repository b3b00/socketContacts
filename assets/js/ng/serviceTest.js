'use strict';

/* Services */
/*
angular.module('socketServices', []).
    factory('Socket', function(){
  return {
  	testIt : function() {
  		console.log('my first working angular service');
  	} 
  }
});
*/

angular.module('socketServices',[]).
	factory('Socket',function($rootScope) {

var $socket, url;
  $socket = void 0;
  url = "http://" + document.location.hostname + ":1336";
  console.log("SOCKET URL : " + url);
  $socket = io.connect(url);
  $socket.on("connect", function(stream) {
    console.log("someone connected!");
    $socket.on("connectedUsers", function(data) {
      console.log("connected users: ", data);
      return $rootScope.$apply(function() {
        return $rootScope.connectedUsers = data;
      });
    });
    $socket.on("setAll", function(data) {
      return $rootScope.$apply(function() {
        var contact;
        contact = data.contact;
        console.log('SOCKET :: [setAll] message');
        console.log(data);
        $rootScope.contacts = data.contacts;
        angular.element('#waiting_div').hide();
        return angular.element('#contacts_div').show();
      });
    });
    $socket.on("addContact", function(data) {
      return $rootScope.$apply(function() {
      	console.log('SOCKET :: [addContact] message');
        var contact;
        contact = data.contact;
        console.log(data);
        return $rootScope.contacts = data.contacts;
      });
    });
    $socket.on("removeContact", function(data) {
      return $rootScope.$apply(function() {
      	console.log('SOCKET :: [removeContact] message');
        var contact;
        contact = data.contact;
        return $rootScope.contacts = data.contacts;
      });
    });
    $socket.on("editContact", function(data) {
      return $rootScope.$apply(function() {
      	console.log('SOCKET :: [editContact] message');
        var contact;
        contact = data.contact;
        return $rootScope.contacts = data.contacts;
      });
    });
    return $socket.on("disconnect", function(stream) {
      return console.log("someone disconnected");
    });
  });
  angular.element('#waiting_div').show();
  angular.element('#contacts_div').hide();
  return $socket;

	})