const User = require('../models/users');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
            user = await User.findOne({username: payload.username});
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
            const token = jwt.sign({user}, process.env.JWT_SECRET, {algorithm: 'HS256', expiresIn: '1440h'}, {});
            res.status(200).json({status: 'success', data: token});
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
                email: req.body.email.trim(),
                fullName: req.body.fullName.trim(),
                pic: req.file.pic.trim(),
            }

            let isUserExisted = await User.findOne({username: payload.username});
            if(isUserExisted)
            {
                res.status(401).json({status: 'error', message: 'Username already exist'});
                return;
            }
            if(payload.password.length < 8)
            {
                res.status(401).json({status: 'error', message: 'Password must be at least 8 characters'});
                return;
            }
            payload.password = bcrypt.hashSync(payload.password, bcrypt.genSaltSync(10), null);
            let user = await User.create(payload);
            const token = jwt.sign({user}, process.env.JWT_SECRET, {algorithm: 'HS256',expiresIn: '1440h'},{} );
            res.status(200).json({status: 'success', data: token});
        }
        catch (err)
        {
            res.status(500).json({status: 'error', message: err.message});
        }
    }
}

module.exports = new Authenticate();
