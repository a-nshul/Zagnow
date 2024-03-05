const express = require('express');
const { createReview, getReviews, updateReview, deleteReview } = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware.authenticateUser);

router.post('/', createReview);
router.get('/', getReviews);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

module.exports = router;
