const express = require('express');
const router = express.Router();
const cmsController = require('../controllers/cms-controller');

router.get('/', function (req, res, next) {
    cmsController.getDashboardView(req, res, next);
});

router.get('/words', function (req, res, next) {
    cmsController.getWordsView(req, res, next);
});

module.exports = router;
