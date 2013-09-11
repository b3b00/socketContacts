angular.module('contacts', ['ui.bootstrap']);


function ContactsCtrl($rootScope, $http, $dialog) { //, Contact) {



    //$scope.delContact = Contact.delContact;
    //Contact.getAll();
    $rootScope.contacts = [{
        firstName: 'first1',
        lastName: 'last1',
        phoneNumber: 'phone1',
        id: 'id1'
    }, {
        firstName: 'first2',
        lastName: 'last2',
        phoneNumber: 'phone2',
        id: 'id2'
    }];
    



    getAll = function () {

        $http.get('/contacts/getAll').success(function (data) {
            $rootScope.contacts = data;
        });

    }

    $rootScope.getAll = getAll;

    rmContact = function (id) {
        $rootScope.socketService().emit('removeContact',id);
    }

    $rootScope.rmContact = rmContact;


    function addContact(serialForm) {

        $http.post('/contacts/add', serialForm).success(function (data) {

            $rootScope.contacts = data;
        });

    }
    $rootScope.addContact = addContact;

    // -------------------- ADD DIALOG START ---------------------------

    $rootScope.addOpts = {
        backdrop: false,
        keyboard: true,
        backdropClick: true,
        templateUrl: '/dialog/addContactDialog.html', // or template : tplString
        controller: 'addContactCtrl'
    };

    function updateData(data) {
	$rootScope.contacts = data;
    }
    
    
    $rootScope.openAddDialog = function () {
        var d = $dialog.dialog($rootScope.addOpts);
        d.open().then(function (result) {
            console.log(result);
            if (result && result.firstName && result.lastName && result.phoneNumber) {                
				$rootScope.socketService().emit('addContact',result);
            }
			
            });
        
    }

    $rootScope.openMessageBox = function () {
        var title = 'This is a message box';
        var msg = 'This is the content of the message box';
        var btns = [{
            result: 'cancel',
            label: 'Cancel'
        }, {
            result: 'ok',
            label: 'OK',
            cssClass: 'btn-primary'
        }];

        $dialog.messageBox(title, msg, btns)
            .open()
            .then(function (first, last, phone) {
		console.log('closing(' + first + ',' + last + ',' + phone + ')');
            });
    };

	 // -------------------- ADD DIALOG END ---------------------------

	

	


   
	
	 // -------------------- EDIT DIALOG START ---------------------------

    $rootScope.editOpts = {
        backdrop: false,
        keyboard: true,
        backdropClick: true,
        templateUrl: '/dialog/editContactDialog.html', // or template : tplString
        controller: 'editContactCtrl'
    };

    function updateData(data) {
	$rootScope.contacts = data;
    }
    
    
    $rootScope.openEditDialog = function (editContact) {
		console.log("openEditDialog()",editContact);
        var d = $dialog.dialog($rootScope.editOpts);
		$rootScope.editId = editContact.id;
		$rootScope.editFirstName = editContact.firstName;
		$rootScope.editLastName = editContact.lastName;
		$rootScope.editPhoneNumber = editContact.phoneNumber;
        d.open().then(function (result) {
            console.log(result);
			// TODO 
            if (result && result.id && result.firstName && result.lastName && result.phoneNumber) {                
				console.log("emiting [editContact]");	
				$rootScope.socketService().emit('editContact',result);
            }
			
            });
        
    }

    $rootScope.openMessageBox = function () {
        var title = 'This is a message box';
        var msg = 'This is the content of the message box';
        var btns = [{
            result: 'cancel',
            label: 'Cancel'
        }, {
            result: 'ok',
            label: 'OK',
            cssClass: 'btn-primary'
        }];

        $dialog.messageBox(title, msg, btns)
            .open()
            .then(function (id, first, last, phone) {
				console.log('closing(' + first + ',' + last + ',' + phone + ')');
            });
    };


	
	


    // -------------------- EDIT DIALOG END ---------------------------

	// -------------------- SOCKET START ---------------------------

	$rootScope.socketService = function() {
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

	// -------------------- SOCKET END ---------------------------
	
    getAll();
	
	$rootScope.socketService();

}

function addContactCtrl($rootScope, dialog) {
    $rootScope.closeDlg = function (first, last, phone) {        
        dialog.close({
            'firstName': first,
            'lastName': last,
            'phoneNumber': phone
        });
    };
	
	
    
    $rootScope.cancelDlg = function () {        
        dialog.close();
    };
}


function editContactCtrl($rootScope, dialog) {

	$rootScope.closeEditDlg = function (id, first, last, phone) {        
        dialog.close({
			'id' : id,
            'firstName': first,
            'lastName': last,
            'phoneNumber': phone
        });
    };
	
	$rootScope.cancelEditDlg = function () {        
        dialog.close();
    };
}
	