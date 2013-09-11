/**
 * WebsockController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  demo: function(req,res) {
	return res.view({});
  },
  
  echo: function(req,res) {
	inMsg = req.param('message');
	 // Send a JSON response
    res.json({
      success: true,
      message: inMsg
    });
	res.json({
      success: true,
      message: inMsg+"...2"
    });
  },
  
  chat : function(req,res) {
	/*console.log('websock.send('+req.param('message')+')');
	Message.subscribe(req.socket);
	Message.publishCreate({message : req.param('message')});*/
	return res.view({});
  }
  
  

};
