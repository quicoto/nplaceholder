/*-----------------------------------------------------------------------------------*/
/* author: Ricard Torres - rick@quicoto.com - @ricard_dev - http://php.quicoto.com */
/*-----------------------------------------------------------------------------------*/
/* To start the server.js run in Terminal ---> hotnode server.js */
/*-----------------------------------------------------------------------------------*/


var http = require('http');
var path = require('path');
var fs = require('fs');	
var url = require('url');	
var easyimg = require('easyimage');

var mimeTypes = {
 '.js' : 'text/javascript',
 '.html': 'text/html',
 '.css' : 'text/css'
};

http.createServer(function (request, response) {

	// need to normalize   path.normalize ?
	
	if(request.url != '/favicon.ico'){
	
		var urlString = request.url;
		
		var new_array = urlString.split('/');
		
		var user_width = new_array[1];
		var user_height = new_array[2];
				
		console.log(new_array);
	}
	

	 var img = fs.readFileSync('./cat.jpg');
	 
	 easyimg.info('./cat.jpg', function(err,stdout,stderr) {
		  console.log('Next line should be unsupported error');
		  console.log(err);
	});
	 
	 easyimg.resize({src:'./cat.jpg', dst:'./resize.jpg', width:100, height:100}, function(err, image) {
		
		console.log('Resized');
		console.log(image);
	});	 

     response.writeHead(200, {'Content-Type': 'image/gif' });
     response.end(img, 'binary');

      
}).listen(8080);