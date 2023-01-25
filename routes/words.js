const express = require('express');
const router = express.Router();
const wordsController = require("../controllers/word-controller");
router.get('/upload', function (req, res, next) {
    wordsController.getCreateView(req, res, next);
});

router.post('/upload', function (req, res, next) {
    wordsController.handleUpload(req, res, next);
});

module.exports = router;