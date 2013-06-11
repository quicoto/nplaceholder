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

	var url = path.normalize(request.url);
	
	if(url != '/favicon.ico'){
	
		var urlString = url;
		
		var new_array = urlString.split('/');
		
		var user_width = new_array[1];
		var user_height = new_array[2];
			
			
		 
		easyimg.info('./cat.jpg', function(err,stdout,stderr) {
			  console.log('Next line should be unsupported error');
			  console.log(err);
		});
		
		var original_img = './cat.jpg';
		 
		/* easyimg.resize({src:original_img, dst:'./resize.jpg', width:user_width, height:user_height}, function(err, image) {
			
			console.log('Resized');
			console.log(image);
		});	*/
		
		
		var rand_number = Math.floor((Math.random()*500)+1);
		
		var dest_img = './cache/resize-' + rand_number + '.jpg';
//		var dest_img = './resize.jpg';
		fs.open(dest_img, 'w+', '0777');

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
			}
		);		
		
		 var img = fs.readFileSync(dest_img);
		
	     response.writeHead(200, {'Content-Type': 'image/gif' });
	     
	      fs.unlink(dest_img);
	     
	     response.end(img, 'binary');   
	     
	 }

      
}).listen(8080);