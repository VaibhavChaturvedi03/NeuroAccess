const express = require('express');
const controller = require('../../controllers/settings/settings.controller');
const { settingsSchema } = require('../../validators/settings.validator');
const { validateBody } = require('../../middleware/validate');

const router = express.Router();

router.get('/', controller.getSettings);
router.put('/', validateBody(settingsSchema), controller.upsertSettings);

module.exports = router;
