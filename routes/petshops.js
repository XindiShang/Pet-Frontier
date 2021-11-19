const express = require('express');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isOwner, validatePetShop } = require('../middleware');
const petshops = require('../controllers/petshops')
const multer = require('multer')
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const router = express.Router();



// *********************** petshops ***********************
// get all shops & add new shop
router.route('/')
    .get(catchAsync(petshops.index))
    .post(isLoggedIn, upload.array('image'), validatePetShop, catchAsync(petshops.createPetshop))


// form: add new shop
router.get('/new', isLoggedIn, petshops.renderNewForm)

// operations of a single shop: R/U/D
router.route('/:id')
    .get(catchAsync(petshops.showPetshop))
    .put(isLoggedIn, isOwner, upload.array('image'), validatePetShop, catchAsync(petshops.editPetshop))
    .delete(isLoggedIn, isOwner, catchAsync(petshops.deletePetshop))

// edit shop
router.get('/:id/edit', isLoggedIn, isOwner, catchAsync(petshops.renderEditForm))

module.exports = router;