
var express = require('express');
var bodyParser = require('body-parser');



var PORT = process.env.PORT || 8000;
var app = express();
//serve static content aka style.css etc
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());


// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//import routes and give server access to them
var routes=require("./controllers/burgers_controller");

app.use(routes);

app.listen(process.env.PORT || 8000, function(){
  console.log('The app is definitely listening on port ' + port);
});
