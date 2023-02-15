const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login-controller');

router.get('/', function(req, res, next) {
  loginController.getLoginView(req, res, next);
});

router.post('/', function(req, res, next) {
  loginController.validateLogin(req, res, next);
});

router.get('/logout', function(req, res, next) {
    loginController.logout(req, res, next);
});

router.all("/cms", (req, res, next) => {
  loginController.verifyCookie(req, res, next);
});
router.all("/cms/*", (req, res, next) => {
  loginController.verifyCookie(req, res, next);
});

module.exports = router;
