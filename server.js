var express = require('express');
// App
var app = express();
var path = require('path');

const PORT = '8080';

//Serves HTML static content index.html inside app folder
app.use(express.static('app'));

app.get('/', function(req, res){
  res.send('hello world');
});

/**
* Health-check endpoint
**/
app.get('/', (req, res) => {
  try {
    console.log('hello-nodejs');
    // Return a 200 'OK'
    res.status(200).send(`hello-nodejs running`);
  } catch (error) {
    console.log(`Something went wrong while responding to readiness check at /health: ${error}`);
  }
});

//App should listen on all interfaces on port 8080
app.listen(PORT, () => {
  console.log(`hello-nodejs running @ hello-nodejs:8080`);
});
