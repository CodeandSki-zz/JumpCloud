var
  express = require('express'),
  app = express(),
  PORT = 3004;

var data = {
  todos: require('./data/todos')
};

var routes = {
  todos: require('./routes/todos')(data.todos)
};

app.use(express.static(__dirname + '/public'));

// ToDo API routes
app.get('/api/todos', routes.todos.getAll);
app.get('/api/todos/:id', routes.todos.getOne);

app.listen(PORT, function() {
  console.log('Server started on port ' + PORT);
});
