const express = require('express');
const multer = require("multer");
const router = express.Router();
const upload = multer()
const studentController = require('../controllers/student-controller');

router.get('/upload', function(req, res, next) {
    studentController.getDetailCreateView(req, res, next);
});

router.post('/upload', upload.single("student"), function (req, res, next) {
    studentController.handleCreate(req, res, next);
});

router.get('/:studentId', function (req, res, next) {
    studentController.getDetailUpdateView(req, res, next)
});

router.post('/:studentId', upload.single("student"), function (req, res, next) {
    studentController.handleUpdate(req, res, next);
});

module.exports = router;