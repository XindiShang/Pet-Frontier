const User = require('../models/user')
const async = require('async');
const nodemailer = require('nodemailer');
const crypto = require('crypto')
const PetShop = require('../models/petshop');
const { cloudinary } = require('../cloudinary');

module.exports.renderRegistrationForm = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
    try {
        const defaultUrl = 'https://res.cloudinary.com/addisonshang/image/upload/v1636456688/PetFrontier/ep7wvdxzggejmnaflaa4.png';
        const defaultFilename = 'PetFrontier/ep7wvdxzggejmnaflaa4';
        const { email, username, password, firstName, lastName, bio } = req.body;
        const user = new User({ email, username, firstName, lastName, bio, avatar: { url: defaultUrl, filename: defaultFilename } });

        if (req.body.adminCode === 'sxf') {
            user.isAdmin = true;
        }

        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', '欢迎加入宠物前线');
            res.redirect('/petshops');
        })
    } catch (err) {
        req.flash('error', err.message)
        res.redirect('/register')
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login');
}

module.exports.login = async (req, res) => {
    req.flash('success', '登录成功')
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', '已退出登录')
    res.redirect('/')
}

module.exports.renderForgot = (req, res) => {
    res.render('users/forgot');
}

module.exports.forgot = (req, res, next) => {
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                const token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            User.findOne({ email: req.body.email }, function (err, user) {
                if (!user) {
                    req.flash('error', '邮箱不存在');
                    return res.redirect('/forgot');
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function (err) {
                    done(err, token, user);
                });
            });
        },
        function (token, user, done) {
            const smtpTransport = nodemailer.createTransport({
                host: 'smtp.qq.com',
                auth: {
                    user: process.env.QQ_USER,
                    pass: process.env.QQ_AUTH_CODE
                }
            });
            const mailOptions = {
                to: user.email,
                from: `PetFrontierTeam ✉ <${process.env.QQ_USER}>`,
                subject: 'Pet Frontier密码重置',
                text: `${user.username}，您好：\n\n我们收到了您重设密码的请求。如果您未提出此请求，请忽略此邮件；\n\n否则，请点击以下链接重设您的密码：\n\nhttp://${req.headers.host}/reset/${token}\n\n\n\n谢谢！\nPetFrontier团队`
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                console.log('mail sent');
                req.flash('success', '密码重置邮件已成功发送至' + user.email + '，请注意查收');
                done(err, 'done');
            });
        }
    ], function (err) {
        if (err) return next(err);
        res.redirect('/forgot');
    });
}

module.exports.renderReset = (req, res) => {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
        if (!user) {
            req.flash('error', '密码重置token已失效或过期，请重试');
            return res.redirect('/forgot');
        }
        res.render('users/reset', { token: req.params.token });
    });
}

module.exports.resetSuccess = (req, res) => {
    async.waterfall([
        function (done) {
            User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
                if (!user) {
                    req.flash('error', '密码重置token已失效或过期，请重试');
                    return res.redirect('back');
                }
                if (req.body.password === req.body.confirm) {
                    user.setPassword(req.body.password, function (err) {
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;

                        user.save(function (err) {
                            req.logIn(user, function (err) {
                                done(err, user);
                            });
                        });
                    })
                }
                else {
                    req.flash("error", "两次输入密码不一致！");
                    return res.redirect('back');
                }
            });
        },
        function (user, done) {
            const smtpTransport = nodemailer.createTransport({
                host: 'smtp.qq.com',
                auth: {
                    user: process.env.QQ_USER,
                    pass: process.env.QQ_AUTH_CODE
                }
            });
            const mailOptions = {
                to: user.email,
                from: `PetFrontierTeam ✉ <${process.env.QQ_USER}>`,
                subject: 'Pet Frontier密码修改成功',
                text: `${user.username}，您好：\n\n您的账户${user.email}密码修改成功，请使用新密码登录。\n\n\n\n谢谢！\nPetFrontier团队`
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                req.flash('success', '密码修改成功');
                done(err);
            });
        }
    ], function (err) {
        res.redirect('/petshops');
    });
}

module.exports.showUserPage = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id)
    if (!user) {
        req.flash("error", "用户不存在");
        return res.redirect("/petshops");
    }
    const petshops = await PetShop.find().where('owner.id').equals(user._id)
    if (!petshops) {
        req.flash("error", "店铺不存在");
        return res.redirect("/petshops");
    }
    res.render("users/show", { user: user, petshops: petshops });
}

module.exports.editUserProfile = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id)
    if (!user) {
        req.flash("error", "用户不存在");
    }
    res.render("users/editProfile", { user: user });
}

module.exports.updateUserProfile = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { ...req.body.user }, { runValidators: true, new: true })
    if (!user) {
        req.flash("error", "用户不存在");
    }
    if (req.file) {
        const { path, filename } = req.file;
        if (!user.avatar.filename === 'PetFrontier/ep7wvdxzggejmnaflaa4') {
            await cloudinary.uploader.destroy(user.avatar.filename);
        }
        user.avatar.url = path;
        user.avatar.filename = filename;
    }
    await user.save();
    req.flash('success', '个人资料更新成功');
    res.redirect(`/users/${user._id}`)
}