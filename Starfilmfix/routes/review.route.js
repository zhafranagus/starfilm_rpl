const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/review.controller');

router.post('/', ReviewController.insert);
router.get('/:id', ReviewController.show);
router.post('/:id', ReviewController.update);
router.delete('/:id', ReviewController.delete);

module.exports = router;
