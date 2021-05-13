// Models
const { Todo } = require('../models');
const validator = require('validator');

const getAll = (req, res) => {
  Todo.getAll((todos) => {
    res.send(todos);
  });
};

const getByGuid = (req, res) => {
  const { guid } = req.params;
  // Read all user
  Todo.getAll((todos) => {
    // Filter by guid
    const todo = todos.find(ent => ent.guid === guid);

    if (todo) {
      res.send(todo);
    } else {
      res.status(404).send({
        message: 'Ups!!! Task not found.',
      });
    }
  });
};


const createTodo = (req, res) => {
  const { body } = req;
  // Create new instance
  const newTodo = new Todo(body);
  // Save in db
  newTodo.save();
  res.send({
    message: 'Task successfully created!!!',
    guid: newTodo.getGuid(),
  });
};

const updateTodo = (req, res) => {
  const { params: { guid }, body } = req;
  Todo.getAll((todos) => {
    // Filter by guid
    const todo = todos.find(ent => ent.guid === guid);

    if (todo) {
      Object.assign(todo, body);
      Todo.update(todos);
      res.send({
        message: 'Task successfully updated!!!',
      });
    } else {
      res.status(404).send({
        message: 'Ups!!! Task not found.',
      });
    }
  });
};

const deleteTodo = (req, res) => {
  const { guid } = req.params;
  Todo.getAll((todos) => {
    // Filter by guid
    const todoIdx = todos.findIndex(ent => ent.guid === guid);

    if (todoIdx !== -1) {
      todos.splice(todoIdx, 1);
      Todo.update(todos);
      res.send({
        message: 'Task successfully deleted!!!',
      });
    } else {
      res.status(404).send({
        message: 'Ups!!! Task not found.',
      });
    }
  });
};

module.exports = {
  getAll,
  getByGuid,
  createTodo,
  updateTodo,
  deleteTodo
};
