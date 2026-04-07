const express = require('express');
const controller = require('../../controllers/auth/auth.controller');

const router = express.Router();

router.post('/session', controller.createSession);

module.exports = router;
