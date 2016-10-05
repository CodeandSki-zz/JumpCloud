var
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express(),
  PORT = 3004;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

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
