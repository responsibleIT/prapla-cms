const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student-controller');

router.get('/upload', function(req, res, next) {
    studentController.getDetailCreateView(req, res, next);
});


module.exports = router;