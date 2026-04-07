const express = require('express');
const controller = require('../../controllers/site-overrides/site-overrides.controller');
const { siteOverridesSchema } = require('../../validators/site-overrides.validator');
const { validateBody } = require('../../middleware/validate');

const router = express.Router();

router.get('/', controller.getSiteOverride);
router.put('/', validateBody(siteOverridesSchema), controller.upsertSiteOverride);

module.exports = router;
