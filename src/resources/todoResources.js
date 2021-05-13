// Modules
const express = require('express');
const TodoResources = express.Router();

// Controllers
const { TodoControllers } = require('../controllers');

// All user resources
TodoResources.get('/', TodoControllers.getAll);
TodoResources.post('/', TodoControllers.createTodo);
TodoResources.get('/:guid', TodoControllers.getByGuid);
TodoResources.put('/:guid', TodoControllers.updateTodo);
TodoResources.delete('/:guid', TodoControllers.deleteTodo);

module.exports = TodoResources;
