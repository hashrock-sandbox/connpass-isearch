var express = require('express');
var app = express();
const fetchConnpass = require("./lib/parser").fetchConnpass

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/connpass', function(request, response) {
  fetchConnpass((result)=>{
    response.json(result)
  })
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});

