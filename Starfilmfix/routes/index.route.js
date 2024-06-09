const express = require('express');
const router = express.Router();

const IndexController = require('../controllers/index.controller');

router.get('/', IndexController.index);
router.get('/about', IndexController.about);

module.exports = router;
