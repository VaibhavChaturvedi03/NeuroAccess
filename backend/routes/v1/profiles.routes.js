const express = require('express');
const controller = require('../../controllers/profiles/profiles.controller');
const { profilesSchema } = require('../../validators/profiles.validator');
const { validateBody } = require('../../middleware/validate');

const router = express.Router();

router.get('/', controller.getProfiles);
router.put('/', validateBody(profilesSchema), controller.upsertProfiles);

module.exports = router;
