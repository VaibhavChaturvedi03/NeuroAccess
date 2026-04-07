const express = require('express');
const controller = require('../../controllers/reports/reports.controller');
const { reportSchema } = require('../../validators/reports.validator');
const { validateBody } = require('../../middleware/validate');

const router = express.Router();

router.get('/', controller.listReports);
router.get('/:reportId', controller.getReport);
router.post('/', validateBody(reportSchema), controller.createReport);

module.exports = router;
