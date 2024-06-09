const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

const Guard = require('../middlewares/auth');

router.get('/login', Guard.unauthenticated, (req, res) => {
	res.render('auth/login', {
		error: req.flash('error'),
		success: req.flash('success'),
	});
});

router.get('/register', Guard.unauthenticated, (req, res) => {
	res.render('auth/register', {
		error: req.flash('error'),
		success: req.flash('success'),
	});
});

router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/register', AuthController.register);

module.exports = router;
