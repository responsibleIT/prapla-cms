const express = require('express');
const multer = require("multer");
const router = express.Router();
const upload = multer()
const wordsController = require("../controllers/word-controller");

router.get('/upload', function (req, res, next) {
    wordsController.getDetailCreateView(req, res, next);
});

router.post('/upload', upload.single('image'), function (req, res, next) {
    wordsController.handleCreate(req, res, next);
});

router.get('/:wordId', function (req, res, next) {
    wordsController.getDetailUpdateView(req, res, next)
});

router.post('/:wordId', upload.single('image'), function (req, res, next) {
    wordsController.handleUpdate(req, res, next)
});

module.exports = router;