const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Review = require('./review')
const { Schema } = mongoose;

const imageSchema = new Schema({
    url: String,
    filename: String,
});

imageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200,c_scale');
})

imageSchema.virtual('carousel').get(function () {
    return this.url.replace('/upload', '/upload/h_400,w_600,b_auto,c_pad');
})

imageSchema.virtual('blur').get(function () {
    return this.url.replace('/upload', '/upload/w_100,c_scale');
})

imageSchema.virtual('blurCarousel').get(function () {
    return this.url.replace('/upload', '/upload/h_60,w_90,b_auto,c_pad');
})

const petshopSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    images: [imageSchema],
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    description: {
        type: String,

    },
    location: {
        type: String,
    },
    tel: String,
    lng: Number,
    lat: Number,
    province: String,
    city: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    owner: {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review',
        }
    ]

})

// mongooae query middleware
petshopSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

// pagination
mongoosePaginate.paginate.options = {
    limit: 12,
}
petshopSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('PetShop', petshopSchema)