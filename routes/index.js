var express = require('express');
var router = express.Router();
var mariasql  = require('mariasql');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
 


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'VRCWorld - Home' });
/*  res.set('Cache-Control', 'public, max-age=86400'); */
});
router.get('/submit', function(req, res, next) {
  res.render('submit', { title: 'VRCWorld - Submit a world' });
});

var con = new mariasql({  
  host     : 'localhost',  
  user     : 'null',  
  password : 'null',  
  db       : 'vrcworlds'  
}); 

router.post('/post', function (req, res) {
      console.log(req.body.world_name);
      console.log(req.body.world_id);
      console.log(req.body.image_url);
      console.log(req.body.upload_username);
      		con.connect(function(err) {
      			if (err) throw  err;
      			console.log("connected");
      			var sql = "INSERT INTO `worlds`(`world_name`,`world_id`, `image_url`, `upload_username`) VALUES ('"+req.body.world_name+"','"+req.body.world_id+"','"+req.body.image_url+"','"+req.body.upload_username+"')";
      		con.query(sql, function(err, result)  {
      		if(err) throw err;
      		console.log("Data Recived");
	  		res.redirect('/');
			});
      	con.end();
      	 console.log('Connection Closed')
		});
});
router.get('/worldlist', function(req, res) {
	var personList = [];

	// Connect to MySQL database.
	con.connect();
	console.log('Connected');

	// Do the query to get data.
	con.query('SELECT * FROM worlds', function(err, rows, fields) {
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} else {
	  		// Loop check on each row
	  		for (var i = 0; i < rows.length; i++) {

	  			// Create an object to save current row's data
		  		var person = {
		  			'world_name':rows[i].world_name,
		  			'world_id':rows[i].world_id,
		  			'image_url':rows[i].image_url,
		  			'upload_username':rows[i].upload_username
		  		}
		  		// Add object into array
		  		personList.push(person);
	  	}

	  	// Render index.pug page using array 
		res.json({personList});
	  	}
	  	console.log('Data Sent')
	});

	// Close the MySQL connection
	con.end();
	console.log('Connection Closed')
});

module.exports = router;
