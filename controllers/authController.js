const User = require('../models/users');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const algoliaClient = require('../config/algolia');

class Authenticate
{
    constructor()
    {
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }
    async login(req, res, next)
    {
        try
        {
            const payload = {
                password: req.body.password.trim(),
                username: req.body.username.trim()
            };
            let user;
            user = await User.findOne({username: payload.username}).lean();
            if(!user)
            {
                res.status(401).json({status: 'error', message: 'Invalid username or password'});
                return;
            }
            let validPassword = bcrypt.compareSync(payload.password, user.password);
            if(!validPassword)
            {
                res.status(401).json({status: 'error', message: 'Invalid username or password'});
                return;
            }
            jwt.sign({_id: user._id}, process.env.JWT_SECRET, {algorithm: 'HS256', expiresIn: '720h'}, (err, token) => {
                res.status(200).json({status: 'success', data: token});
            });
        }
        catch(err)
        {
            res.status(500).json({status: 'error', message: err.message});
        }
    }

    async register(req, res, next)
    {
        try
        {
            const payload = {
                password: req.body.password.trim(),
                username: req.body.username.trim(),
                phone: req.body.phone.trim(),
                email: req.body.email.trim(),
                fullName: req.body.fullName.trim(),
            }

            let isUserExisted = await User.findOne({username: payload.username}).lean();
            if(isUserExisted)
            {
                res.status(401).json({status: 'error', message: 'Username already exist'});
                return;
            }

            payload.password = bcrypt.hashSync(payload.password, bcrypt.genSaltSync(10), null);
            await User.create(payload);
            let user = await User.findOne({username: payload.username}).lean();
            if(!user)
            {
                res.status(401).json({status: 'error', message: 'Create account failed'});
                return;
            }
            await algoliaClient.initIndex('Chat-User').saveObject({
                username: user.username,
                fullName: user.fullName,
                pic: user.pic,
                phone: user.phone,
                email: user.email,

            });
            jwt.sign({_id: user._id}, process.env.JWT_SECRET, {algorithm: 'HS256',expiresIn: '720h'}, (err, token) => {
                res.status(200).json({status: 'success', data: token});
            });
        }
        catch (err)
        {
            res.status(500).json({status: 'error', message: err.message});
        }
    }
}

module.exports = new Authenticate();
