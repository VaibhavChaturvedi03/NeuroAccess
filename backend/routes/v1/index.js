const express = require('express');
const authMiddleware = require('../../middleware/auth');

const healthRoutes = require('./health.routes');
const authRoutes = require('./auth.routes');
const settingsRoutes = require('./settings.routes');
const reportsRoutes = require('./reports.routes');
const profilesRoutes = require('./profiles.routes');
const siteOverridesRoutes = require('./site-overrides.routes');
const aiProxyRoutes = require('./ai-proxy.routes');

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);

router.use(authMiddleware);
router.use('/settings', settingsRoutes);
router.use('/reports', reportsRoutes);
router.use('/profiles', profilesRoutes);
router.use('/site-overrides', siteOverridesRoutes);
router.use('/ai-proxy', aiProxyRoutes);

module.exports = router;
