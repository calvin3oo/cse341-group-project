const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

router.get('/', authController.auth);

//oauth callback route settings: https://github.com/settings/applications/1921552
router.get('/oauth-callback', authController.oauthcallback);

router.get('/logout', authController.logout);

module.exports = router;
