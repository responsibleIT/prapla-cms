const express = require('express');
const multer = require("multer");
const router = express.Router();
const upload = multer()
const userController = require('../controllers/user-controller');

router.get('/upload', async (req, res, next) => {
    await userController.getDetailCreateView(req, res, next)
});

router.post('/upload', upload.single("user"), async (req, res, next) => {
    await userController.handleCreate(req, res, next);
});

router.get('/:userId', async (req, res, next) => {
    await userController.getDetailUpdateView(req, res, next)
});

router.post('/:userId', upload.single("user"), async (req, res, next) => {
    await userController.handleUpdate(req, res, next);
});

module.exports = router;
