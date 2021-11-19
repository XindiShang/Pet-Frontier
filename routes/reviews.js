const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isAuthor } = require('../middleware');
const catchAsync = require('../utils/catchAsync');
const reviews = require('../controllers/reviews')


// *********************** reviews ***********************
// leave review
router.post('/', validateReview, catchAsync(reviews.createReview))

// delete review
router.delete('/:reviewId', isLoggedIn, isAuthor, catchAsync(reviews.deleteReview))

module.exports = router;