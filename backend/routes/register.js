const express = require('express');
const router = express.Router();
const userModel = require('../models/userschema');
const postModel = require('../models/postschema');
const passport = require('passport');
const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()));
const upload = require('../Multer');
const create = require('prompt-sync');

router.get('/', isLoggedin, async function (req, res, next) {
        const user = await userModel.findOne({
                username: req.session.passport.user
        }).populate("posts");
        res.render('profile', { user });
});

router.get('/feed', async (req, res) => {
        const post_data = await postModel.find({});
        res.render('feed', { post_data })
});

router.post('/register', function (req, res) {
        const { username, email, fullname } = req.body;
        const usersData = new userModel({ username, email, fullname });
        console.log(req.body.username);
        userModel.register(usersData, req.body.password)
                .then(function () {
                        passport.authenticate('local')(req, res, function () {
                                res.redirect("/");
                        })
                })
})
router.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
}), function (req, res) {
        console.log("Login successful");
})
router.get('/logout', function (req, res) {
        req.logout(function (err) {
                if (err) { return next(err); }
                res.redirect('/login');
        });
})
router.post('/upload', isLoggedin, upload.single('file'), async (req, res) => {
        if (!req.file) {
                return res.status(400).send('No such file were uploaded.');
        }
        const user = await userModel.findOne({
                username: req.session.passport.user
        })
        // console.log(user);
        const postit = await postModel.create({
                image: req.file.filename,
                postText: req.body.caption,
                users: user._id
        });
        user.posts.push(postit._id);
        await user.save();
        res.redirect('/');
})
function isLoggedin(req, res, next) {
        if (req.isAuthenticated()) return next();
        res.redirect("/login")
}
module.exports = router;