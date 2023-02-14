const express = require('express');
const multer = require("multer");
const router = express.Router();
const upload = multer()
const wordsController = require("../controllers/word-controller");

router.get('/upload', async (req, res, next) => {
    await wordsController.getDetailCreateView(req, res, next);
});

router.post('/upload', upload.single('image'), async (req, res, next) => {
    await wordsController.handleCreate(req, res, next);
});

router.get('/:wordId', async (req, res, next) => {
    await wordsController.getDetailUpdateView(req, res, next)
});

router.post('/:wordId', upload.single('image'), async (req, res, next) => {
    await wordsController.handleUpdate(req, res, next)
});

module.exports = router;