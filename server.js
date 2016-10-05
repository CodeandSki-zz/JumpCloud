var
  express = require('express'),
  app = express(),
  PORT = 3004;

app.get('/', function(req, res) {
  res.send('hello world');
});

app.listen(PORT, function() {
  console.log('Server started on port ' + PORT);
});
