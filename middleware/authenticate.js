/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const UserCache = require("../models/user.cache.js");

class Authenticate
{

    constructor()
    {
        this.authenticate = this.authenticate.bind(this);
    }

    async authenticate(req, res, next)
    {
        if (!req.headers.authorization)
        {
            res.status(400).send({message: "Authorization token is missing"});
            return;
        }
        const token = req.headers.authorization.split(" ")[1];
        if (token !== "null")
        {
            let _id;
            try
            {
                jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                    if (decoded.exp * 1000 < Date.now())
                    {
                        res.status(400).send({message: "Authorization token was expired"});
                        return;
                    }
                    _id = decoded._id;
                });

            }
            catch (err)
            {
                console.log(err.message);
                res.status(400).send({message: "Authorization token was expired or was not valid"});
                return;
            }
            let user = await UserCache.fetch(_id);
            if(!user._id)
            {
                user = await User.findById(_id).lean(true).exec();
                user = JSON.parse(JSON.stringify(user));
                await UserCache.save(user._id.toString(), user);
            }
            req.user = user;
            next();
        }
    };
}


module.exports = new Authenticate();
