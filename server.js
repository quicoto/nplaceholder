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
		
		/* What type of image do you want? */
		
		var type = new_array[3];
		
		var types = new Array();
			types[0] = "cats";
			types[1] = "people";
			types[2] = "tech";
			types[3] = "world";
					
		console.log(types.indexOf(type));
		
				
		if( (type == '') || (type == undefined) || (types.indexOf(type) == -1) ){
		
			var math = Math.floor((Math.random()*types.length));
			
			console.log(math);
			
			 type = types[math];		 
			 
		}
		
		console.log(type);
		
		/* Random */ 
		
		var max_items = 5;
		
		var folder = './' + type + '/';
		
		var original_img = folder + Math.floor((Math.random()*max_items)+1) + '.jpg';
			
//		var original_img = './cat.jpg';

		var rand_number = Math.floor((Math.random()*500000)+1);
		
		var dest_img = './resize-' + rand_number + '.jpg';

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
				
				var img = fs.readFileSync(dest_img);	 
			 
			 	response.writeHead(200, {
			 		'Cache-Control' : 'no-cache',
			 		'Content-Type': 'image/gif' });
			 	
			    response.end(img, 'binary');		 		  
						    	
				fs.unlink(dest_img);	 
		
			}
		);	
			     
	 }
      
}).listen(8080);