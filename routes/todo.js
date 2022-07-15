const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController.js');

router.get('/', todoController.getAllTodos);

//router.get('/:groupId', todoController.getTodosByGroup);

//router.get('/:userId', todoController.getTodosByUser);

router.get('/:todoId', todoController.getTodoById);

router.post('/', todoController.addNewTodo);

router.put('/:todoId', todoController.updateTodo);

router.delete('/:todoId', todoController.deleteTodo);

module.exports = router;