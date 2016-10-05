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
    }

  };
};
