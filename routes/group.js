const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController.js');

router.get('/', groupController.getAllGroups);

router.get('/:groupId', groupController.getGroup);

router.post('/', groupController.addNewGroup);

router.put('/:groupId', groupController.updateGroup);

router.delete('/:groupId', groupController.deleteGroup);

module.exports = router;