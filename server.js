var
  express = require('express'),
  app = express(),
  PORT = 3004;

app.use(express.static(__dirname + '/public'));

var data = {
  todos: require('./data/todos')
};

var controllers = {
  todos: require('./controllers/todos')(data.todos)
};

// ToDo API routes
app.get('/api/todos', controllers.todos.getAll);
app.get('/api/todos/:id', controllers.todos.getOne);

app.listen(PORT, function() {
  console.log('Server started on port ' + PORT);
});
