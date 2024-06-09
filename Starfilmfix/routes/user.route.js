const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.get('/profile', UserController.profile);
router.get('/reviews', UserController.reviews);

module.exports = router;
