var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = 3004;

app.use(bodyParser.json());

app.use(function(req, res, next) {
  var whitelist = [
    'http://localhost:3005',
  ];

  var origin = req.headers.origin;

  if (whitelist.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  return next();
});

var data = {
  todos: require('./data/todos')
};

var controllers = {
  todos: require('./controllers/todos')(data.todos)
};

// ToDo API routes
app.get('/api/todos', controllers.todos.getAll);
app.get('/api/todos/:id', controllers.todos.getOne);
app.post('/api/todos', controllers.todos.create);
app.put('/api/todos/:id', controllers.todos.update);
app.delete('/api/todos/:id', controllers.todos.delete);

app.listen(PORT, function() {
  console.log('Server started on port ' + PORT);
});
