const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student-controller');
const wordsController = require("../controllers/word-controller");

router.get('/upload', function(req, res, next) {
    studentController.getDetailCreateView(req, res, next);
});

router.get('/:studentId', function (req, res, next) {
    studentController.getDetailUpdateView(req, res, next)
});

module.exports = router;