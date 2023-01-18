const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login/login-controller');

router.get('/', function(req, res, next) {
  loginController.getLogin(req, res, next);
});

router.post('/', function(req, res, next) {
  loginController.validateLogin(req, res, next);
});

router.all("/cms", (req, res, next) => {
  loginController.verifyCookie(req, res, next);
});
router.all("/cms/*", (req, res, next) => {
  loginController.verifyCookie(req, res, next);
});

module.exports = router;
