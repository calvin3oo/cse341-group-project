const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController.js');

router.get('/', mainController.home);

router.get('/auth', mainController.auth);

router.get('/oauth-callback', mainController.oauthcallback);

module.exports = router;