"use strict"



angular.module("socketServices", []).factory "Socket", ($rootScope, $timeout) ->

  cleanMessages = () ->     
      $rootScope.alerts = []


  addAlert = (message) ->    
      $rootScope.alerts = []
      $rootScope.alerts.push 
          msg: ''+message
          type: 'success' 
      console.log "NEW ALERT :: "+message
      $timeout cleanMessages , 3000
    

  $socket = undefined
  url = undefined
  $socket = undefined
  url = "http://" + document.location.hostname + ":1336"
  console.log "SOCKET URL : " + url
  $socket = io.connect(url)
  $socket.on "connect", (stream) ->
    console.log "someone connected!"
    $socket.on "connectedUsers", (data) ->
      console.log "connected users: ", data
      $rootScope.$apply ->
        $rootScope.connectedUsers = data


    $socket.on "setAll", (data) ->
      $rootScope.$apply ->
        contact = undefined
        contact = data.contact
        console.log "SOCKET :: [setAll] message"
        console.log data
        $rootScope.contacts = data.contacts
        angular.element("#waiting_div").hide()
        angular.element("#contacts_div").show()


    $socket.on "addContact", (data) ->
      $rootScope.$apply ->
        console.log "SOCKET :: [addContact] message"
        contact = undefined
        contact = data.contact
        addAlert "Nouveau contact : "+contact.firstName+" "+contact.lastName
        console.log data
        $rootScope.contacts = data.contacts


    $socket.on "removeContact", (data) ->
      $rootScope.$apply ->
        console.log "SOCKET :: [removeContact] message"
        contact = undefined
        contact = data.contact
        $rootScope.contacts = data.contacts
        addAlert "Suppression de : "+contact.firstName+" "+contact.lastName



    $socket.on "editContact", (data) ->
      $rootScope.$apply ->
        console.log "SOCKET :: [editContact] message"
        contact = undefined
        contact = data['old-contact']
        $rootScope.contacts = data.contacts        
        addAlert "Modification de : "+contact.firstName+" "+contact.lastName


    $socket.on "disconnect", (stream) ->
      console.log "someone disconnected"


  angular.element("#waiting_div").show()
  angular.element("#contacts_div").hide()
  $socket
