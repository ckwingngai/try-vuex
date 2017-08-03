var express = require('express');
var app = express();

app.use(express.static('app'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});
