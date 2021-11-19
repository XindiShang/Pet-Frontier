const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users')
const multer = require('multer')
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const { isLoggedIn, checkUser } = require('../middleware');

// register
router.route('/register')
    .get(users.renderRegistrationForm)
    .post(upload.single('avatar'), catchAsync(users.register));

// login
router.route('/login')
    .get(users.renderLoginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

// logout
router.get('/logout', users.logout)

// forgot password
router.route('/forgot')
    .get(users.renderForgot)
    .post(users.forgot)

// password reset
router.route('/reset/:token')
    .get(users.renderReset)
    .post(users.resetSuccess)

// show/edit user profile
router.route('/users/:id')
    .get(users.showUserPage)
    .put(isLoggedIn, checkUser, upload.single('avatar'), catchAsync(users.updateUserProfile))

// show edit profile page
router.route('/users/:id/editProfile')
    .get(isLoggedIn, checkUser, catchAsync(users.editUserProfile))
    
module.exports = router;