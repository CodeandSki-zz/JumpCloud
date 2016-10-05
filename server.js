var
  express = require('express'),
  app = express(),
  PORT = 3004;

app.use(express.static(__dirname + '/public'));

app.listen(PORT, function() {
  console.log('Server started on port ' + PORT);
});
