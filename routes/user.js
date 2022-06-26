const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

router.get('/:groupId', userController.getAllUsers);

router.post('/', userController.addNewUser);

router.get('/:userId', userController.getUserById);

router.put('/:userId', userController.updateUser);

router.delete('/:userId', userController.deleteUser);

module.exports = router;