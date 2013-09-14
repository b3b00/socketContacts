angular.module "contacts", ["ui.bootstrap"]


### ********************************************************
### 
### 	MAIN CONTROLLER
###
### ********************************************************
###

ContactsCtrl = ($rootScope, $http, $dialog) -> 
	
	addContact = (serialForm) ->
  $http.post("/contacts/add", serialForm).success (data) ->
    $rootScope.contacts = data

	getAll = ->
	  $http.get("/contacts/getAll").success (data) ->
	    $rootScope.contacts = data


	$rootScope.getAll = getAll
	rmContact = (id) ->
	  console.log "removeContact "+id	
	  $rootScope.socketService.emit "removeContact", id

	$rootScope.rmContact = rmContact  

	###
	  ---------------------------------------------
	  ---  ADD DIALOG  - START
	  ---------------------------------------------
	###  

	$rootScope.addOpts =
		  backdrop: false
		  keyboard: true
		  backdropClick: true
		  templateUrl: "/dialog/addContactDialog.html" # or template : tplString
		  controller: "addContactCtrl"

	updateData = (data) ->
		$rootScope.contacts = data

    

	$rootScope.openAddDialog = ->
	  d = $dialog.dialog($rootScope.addOpts)
	  d.open().then (result) ->
	    #console.log result
	    if result and result.firstName and result.lastName and result.phoneNumber
	    	$rootScope.socketService.emit "addContact", result  
  

	###	  
	---------------------------------------------
	---  ADD DIALOG  - END
	---------------------------------------------
	###

	###
	  ---------------------------------------------
	  ---  EDIT DIALOG  - START
	  ---------------------------------------------
	### 	

	$rootScope.editOpts = 
        backdrop: false
        keyboard: true
        backdropClick: true
        templateUrl: '/dialog/editContactDialog.html', # or template : tplString
        controller: 'editContactCtrl'
    

    updateData = (data) -> $rootScope.contacts = data
            
	$rootScope.openEditDialog = (editContact) ->
		d = $dialog.dialog($rootScope.editOpts)
		$rootScope.editId = editContact.id
		$rootScope.editFirstName = editContact.firstName
		$rootScope.editLastName = editContact.lastName
		$rootScope.editPhoneNumber = editContact.phoneNumber
		d.open().then (result) ->
		    if result and result.firstName and result.lastName and result.phoneNumber and result.id
		    	$rootScope.socketService.emit "editContact", result            
			

	###
	  ---------------------------------------------
	  ---  EDIT DIALOG  - END
	  ---------------------------------------------
	### 		


	###
	--------------------------------------------
	---  SOCKET - START
	---------------------------------------------
	### 		

	$rootScope.socketService = getSocket($rootScope)


	###
	--------------------------------------------
	---  SOCKET - END
	---------------------------------------------
	### 			

### ********************************************************
###
### 	ADD CONTACT DIALOG CONTROLLER
###
### ********************************************************
###

addContactCtrl = ($rootScope, dialog) ->
    $rootScope.closeDlg = (first, last, phone) ->
        dialog.close(
            'firstName': first
            'lastName': last
            'phoneNumber': phone
            )
        
    
    $rootScope.cancelDlg = () ->
        dialog.close()
    

### ********************************************************
###
### 	EDIT CONTACT DIALOG CONTROLLER
###
### ********************************************************
###

editContactCtrl = ($rootScope, dialog) ->

	$rootScope.closeEditDlg = (id, first, last, phone) ->
        dialog.close(
            'firstName': first
            'lastName': last
            'phoneNumber': phone
            'id' : id
            )

	
	$rootScope.cancelEditDlg =  () ->
        dialog.close()
    

