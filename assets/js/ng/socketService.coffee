hello = ->
  alert 'hello from coffee from socket'



hello()

getSocket = ($rootScope) ->
  
  $socket = undefined
  $socket = io.connect("http://localhost:1336")
  
  $socket.on "connect", (stream) ->
    
    console.log "someone connected!"
    $socket.on "connectedUsers", (data) ->
      console.log "connected users: ", data
      $rootScope.$apply ->
        $rootScope.connectedUsers = data


    $socket.on "setAll", (data) ->
      $rootScope.$apply ->
        contact = data.contact
        console.log data
        $rootScope.contacts = data.contacts


    $socket.on "addContact", (data) ->
      $rootScope.$apply ->
        contact = data.contact
        console.log data
        $rootScope.contacts = data.contacts


    $socket.on "removeContact", (data) ->
      $rootScope.$apply ->
        contact = data.contact
        $rootScope.contacts = data.contacts


    $socket.on "editContact", (data) ->
      $rootScope.$apply ->
        contact = data.contact
        $rootScope.contacts = data.contacts


    $socket.on "disconnect", (stream) ->
      console.log "someone disconnected"

  $socket