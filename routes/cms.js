const express = require('express');
const router = express.Router();
const cmsController = require('../controllers/cms/cms-controller');

router.get('/', function (req, res, next) {
    cmsController.getDashboard(req, res, next);
});


module.exports = router;
