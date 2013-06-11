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

http.createServer(function (request, response) {

	var url = path.normalize(request.url);
				    		
	if(url != '/favicon.ico'){
	
		var urlString = url;
		
		var new_array = urlString.split('/');
		
		var user_width = new_array[1];
		var user_height = new_array[2];
			
		var original_img = './cat.jpg';

		var rand_number = Math.floor((Math.random()*500000)+1);
		
		var dest_img = './resize.jpg';

		easyimg.rescrop(
			{
				src:original_img, dst:dest_img,
				width:user_width, height:user_height,
				cropwidth:user_width, cropheight:user_height,
				x:0, y:0,
				fill: true
			},
			function(err, image) {
				if (err) throw err;
				console.log('Resized and cropped');
				console.log(image);
				
				var new_img =  './resize-' + rand_number + '.jpg';
				
				fs.renameSync(dest_img, new_img);
				
				var img = fs.readFileSync(new_img);	 
			 
			 	response.writeHead(200, {
			 		'Cache-Control' : 'no-cache',
			 		'Content-Type': 'image/gif' });
			 	
			    response.end(img, 'binary');		 		  
						    	
				fs.unlink(new_img);	 
		
			}
		);	
			     
	 }
      
}).listen(8080);