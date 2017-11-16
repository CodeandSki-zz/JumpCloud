var _ = require('underscore');

module.exports = function(todos) {
  return {

    // Gets a list of all the todo items
    getAll: function(req, res) {
      try {
        res.status(200).json(todos);
      } catch(e) {
        res.status(500).send('An error occured while attempting to get all of the todo items');
      }
    },

    // Gets a specific todo item, given a supplied ID
    getOne: function(req, res) {
      var statusCode = 200;
      try {
        if (!req.params.id) {
          statusCode = 500;
          throw 'An ID was not supplied';
        }
        var id = parseInt(req.params.id, 10);
        var todo = _.findWhere(todos, { id: id });
        if (!todo) {
          statusCode = 404;
          throw 'A todo with the given ID was not found';
        } else {
          res.status(statusCode).json(todo);
        }
      } catch(e) {
        res.status(statusCode).send(e);
      }
    },

    // Create a new todo object and add it to the list
    create: function(req, res) {
      var statusCode = 200;
      try {
        if (!req.body.description || req.body.description === '') {
          statusCode = 400;
          throw 'A valid description must be given';
        }
        // get a new ID (would be handled by proepr DB automatically)
        var id = Math.max.apply(null, _.pluck(todos, 'id')) + 1;
        var todo = {
          id: id,
          done: req.body.done || false,
          description: req.body.description
        };
        todos.push(todo);
        res.status(statusCode).json(todo);
      } catch(e) {
        res.status(statusCode).send(e);
      }
    },

    // Update a todo, given a supplied ID
    update: function(req, res) {
      var statusCode = 200;
      try {
        if (!req.params.id) {
          statusCode = 500;
          throw 'An ID was not supplied';
        }
        var id = parseInt(req.params.id, 10);
        var todo = _.findWhere(todos, { id: id });
        if (!todo) {
          statusCode = 404;
          throw 'A todo with the given ID was not found';
        } else {
          _.map(todos, function(t) {
            if (t === todo) {
              todo = _.extendOwn(t, req.body);
              return todo;
            }
          });
          res.status(statusCode).json(todo);
        }
      } catch(e) {
        res.status(statusCode).send(e);
      }
    },

    // Delete a todo, given a supplied ID
    delete: function(req, res) {
      var statusCode = 200;
      try {
        if (!req.params.id) {
          statusCode = 500;
          throw 'An ID was not supplied';
        }
        var id = parseInt(req.params.id, 10);
        var todo = _.findWhere(todos, { id: id });
        if (!todo) {
          statusCode = 404;
          throw 'A todo with the given ID was not found';
        } else {
          todos.splice(todos.indexOf(todo), 1);
          res.status(statusCode).send(true);
        }
      } catch(e) {
        res.status(statusCode).send(e);
      }
    }

  };
};
