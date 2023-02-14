const express = require('express');
const multer = require("multer");
const router = express.Router();
const upload = multer()
const studentController = require('../controllers/student-controller');

router.get('/upload', async (req, res, next) => {
    await studentController.getDetailCreateView(req, res, next);
});

router.post('/upload', upload.single("student"), async (req, res, next) => {
    await studentController.handleCreate(req, res, next);
});

router.get('/:studentId', async (req, res, next) => {
    await studentController.getDetailUpdateView(req, res, next)
});

router.post('/:studentId', upload.single("student"), async (req, res, next) => {
    await studentController.handleUpdate(req, res, next);
});

module.exports = router;