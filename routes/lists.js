const express = require('express');
const multer = require("multer");
const router = express.Router();
const upload = multer()
const listsController = require("../controllers/list-controller");

router.get('/upload', async (req, res, next) => {
    listsController.getDetailCreateView(req, res, next);
});

router.post('/upload', upload.single('list'), async (req, res, next) => {
    listsController.handleCreate(req, res, next);
});

router.get('/:listId', async (req, res, next) => {
    listsController.getDetailUpdateView(req, res, next)
});

router.post('/:listId', upload.single('list'), async (req, res, next) => {
    listsController.handleUpdate(req, res, next)
});

module.exports = router;