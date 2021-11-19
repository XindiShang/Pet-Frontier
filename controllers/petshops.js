const PetShop = require('../models/petshop');
const { cloudinary } = require('../cloudinary');


module.exports.index = async (req, res) => {
    if (!req.query.page) {
        const allShops = await PetShop.paginate({}) // array with docs info
        const shopsData = await PetShop.find({})
        res.render('petshops/index', { allShops, shopsData })
    } else {
        const { page } = req.query;
        const allShops = await PetShop.paginate({}, {
            page
        })
        const shopsData = await PetShop.find({})
        res.render('petshops/index', { allShops, shopsData })
    }
   
}

module.exports.renderNewForm = (req, res) => {
    res.render('petshops/new')
}

module.exports.createPetshop = async (req, res, next) => {
    const newShop = new PetShop(req.body.petshop);
    newShop.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    newShop.owner = {
        id: req.user._id,
        username: req.user.username
    } 
    await newShop.save();
    req.flash('success', '店铺创建成功');
    res.redirect(`/petshops/${newShop._id}`)
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const selectedShop = await PetShop.findById(id);
    if (!selectedShop) {
        req.flash('error', '店铺不存在');
        return res.redirect('/petshops');
    }
    res.render('petshops/edit', { selectedShop });
}

module.exports.editPetshop = async (req, res,) => {
    const { id } = req.params;
    const editShop = await PetShop.findByIdAndUpdate(id, { ...req.body.petshop }, { runValidators: true, new: true })
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    editShop.images.push(...imgs);
    await editShop.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await editShop.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
    }
    req.flash('success', '店铺更新成功');
    res.redirect(`/petshops/${editShop._id}`)
}

module.exports.deletePetshop = async (req, res) => {
    const { id } = req.params;
    const deletedShop = await PetShop.findOneAndDelete({ _id: id }, { runValidators: true, new: true })
    req.flash('success', '店铺删除成功');
    res.redirect(`/petshops`)
}

module.exports.showPetshop = async (req, res) => {
    const { id } = req.params;
    const selectedShop = await PetShop.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author',
        }
    }).populate('owner');
    if (!selectedShop) {
        req.flash('error', '店铺不存在');
        return res.redirect('/petshops');
    }
    res.render('petshops/show', { selectedShop });
}
