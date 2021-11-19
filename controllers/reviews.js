const PetShop = require('../models/petshop')
const Review = require('../models/review')


module.exports.createReview = async (req, res) => {
    const { id } = req.params;
    const selectedShop = await PetShop.findById(id);
    if (!req.isAuthenticated()) {
        req.session.returnTo = `/petshops/${selectedShop._id}`;
        req.flash('error', '请登录');
        return res.redirect('/login');
    }
    const newReview = new Review(req.body.review);
    newReview.author = {
        id: req.user._id,
        username: req.user.username
    }
    selectedShop.reviews.push(newReview)
    await newReview.save();
    await selectedShop.save();
    req.flash('success', '评价发布成功');
    res.redirect(`/petshops/${selectedShop._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await PetShop.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', '评价已删除');
    res.redirect(`/petshops/${id}`);
}
