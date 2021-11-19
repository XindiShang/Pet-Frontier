const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const avatarSchema = new Schema({
    url: String,
    filename: String,
});

avatarSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_100,h_100,c_thumb,g_face,r_max');
})

avatarSchema.virtual('profile').get(function () {
    return this.url.replace('/upload', '/upload/w_300,h_300,c_thumb,g_face,r_max');
})

avatarSchema.virtual('blurProfile').get(function () {
    return this.url.replace('/upload', '/upload/w_100,h_100,c_thumb,g_face,r_max');
})

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    avatar: avatarSchema,
    bio: String,
    firstName: String,
    lastName: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isAdmin: {
        type: Boolean,
        default: false
    }
});

// add a username to userSchema
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);