var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var fs = require('fs');
var obj;
fs.readFile('./data.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
});



/* GET Data listing. */
router.get('/', function(req, res, next) {
  res.json(obj);
 
});
router.post('/',  urlencodedParser, function(req, res) {

  if(!req.body) return res.sendStatus(400);
  var json = JSON.stringify(req.body); 
	fs.writeFile('./data.json', json
			 , function (err) {
  	if (err) throw err;
		console.log('Saved!');
	});
  res.send("OK");

//  fs.writeFile('./data.json')
});


module.exports = router;
