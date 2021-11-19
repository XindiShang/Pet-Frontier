const mongoose = require('mongoose');
const { Schema } = mongoose;

// consider adding photos to the review model
const reviewSchema = new Schema({
    body: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
    },
    author: {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        username: String
    }
});

module.exports = mongoose.model("Review", reviewSchema);