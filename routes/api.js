const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api-controller');

router.all('/', async (req, res, next) => {
    res.status(404).json({ response: 'Not found' });
});

router.get('/list', async (req, res, next) => {
    await apiController.getWordList(req, res);
});

router.all('/list', async (req, res, next) => {
    res.status(404).json({ response: 'Not found' });
});

module.exports = router;