const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController.js');

router.get('/', todoController.getAllTodos);

router.post('/', todoController.addNewTodo);

router.put('/:docID', todoController.updateTodo);

router.delete('/:docID', todoController.deleteTodo);

module.exports = router;