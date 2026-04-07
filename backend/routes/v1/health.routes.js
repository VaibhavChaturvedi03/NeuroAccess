const express = require('express');
const controller = require('../../controllers/health/health.controller');

const router = express.Router();

router.get('/live', controller.liveness);
router.get('/ready', controller.readiness);

module.exports = router;
