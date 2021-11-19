const { petshopSchema, reviewSchema, userSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const PetShop = require('./models/petshop')
const Review = require('./models/review')
const User = require('./models/user')

// user validation
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', '请登录');
        return res.redirect('/login');
    }
    next();
}

// petshop validation
module.exports.validatePetShop = (req, res, next) => {
    const { error } = petshopSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const petShop = await PetShop.findById(id);
    if (!petShop.owner.id.equals(req.user._id)) {
        if (!req.user.isAdmin) {
            req.flash('error', '无权限！')
            return res.redirect(`/petshops/${petShop._id}`)
        }
    }
    next();
}

// review validation
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.id.equals(req.user._id)) {
        if (!req.user.isAdmin) {
            req.flash('error', '无权限！')
            return res.redirect(`/petshops/${id}`)
        }
    }
    next();
}

// user validation
module.exports.checkUser = async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user._id.equals(req.user._id)) {
        if (!req.user.isAdmin) {
            req.flash('error', '无权限！')
            return res.redirect(`/petshops`)
        }
    }
    next();
}

module.exports.validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

