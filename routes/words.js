const express = require('express');
const multer = require("multer");
const router = express.Router();
const upload = multer()

const wordsController = require("../controllers/word-controller");

router.get('/upload', function (req, res, next) {
    wordsController.getCreateView(req, res, next);
});

router.post('/upload', upload.single('image'), function (req, res, next) {
    wordsController.handleUpload(req, res, next);
});

module.exports = router;