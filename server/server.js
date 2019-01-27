var express = require('express');
var fetch = require('node-fetch');

var app = express();

var testReturnObject = {
  image: "http://placehold.it/200x200",
  image2: "http://placehold.it/300x300",
  image3: "http://placehold.it/400x400"
}

var usage = {
  total: [
            ['Reddit', 20],
            ['Google Docs', 20],
            ['Facebook', 19],
            ['Youtube', 26],
            ['Wikipedia', 11],
            ['Behance', 4]
        ],
  desktop: [
            ['Facebook', 25],
            ['Reddit', 18],
            ['Behance', 17],
            ['Youtube', 15],
            ['Wikipedia', 15],
            ['Maps', 10]
          ],
  mobile: [
            ['Reddit', 60],
            ['Instagram', 10],
            ['Facebook', 9],
            ['Youtube', 9],
            ['Google Slides', 9],
            ['Google Docs', 3]
          ]
}

//CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.get('/', function (req, res) {
  res.send("Hello World!")
});

app.get('/test', function (req, res) {
  res.send(testReturnObject)
});

app.get('/phoneFocus', function (req, res) {
  fetch('https://maker.ifttt.com/trigger/focus/with/key/cB9x7dN6g7MXgpPZ2a4nUx')
    .then(function(response) {
      console.log(response);
    })

  res.send("Phone Focus")
});

app.get('/usage', function (req, res) {
  res.send(usage)
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Server started on port '+ port);
});