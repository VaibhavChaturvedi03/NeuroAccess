const express = require('express');
const controller = require('../../controllers/ai-proxy/ai-proxy.controller');
const { aiProxySchema } = require('../../validators/ai-proxy.validator');
const { validateBody } = require('../../middleware/validate');

const router = express.Router();

router.post('/', validateBody(aiProxySchema), controller.proxy);

module.exports = router;
