/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
const User = require("../models/users");

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
            res.status(400).send({message: "Authorization token was expired or was not valid"});
            return;
        }
        const token = req.headers.authorization.split(" ")[1];
        if (token !== "null")
        {
            let _id;
            try
            {
                jwt.verify(token, process.env.JWT_SECRET, {algorithm: 'HS256', expiresIn: '720h'}, (err, result) => {
                    if (result.exp * 1000 < Date.now())
                    {
                        res.status(400).send({message: "Authorization token was expired or was not valid"});
                        return;
                    }
                    _id = result._id;
                });

            }
            catch (err)
            {
                res.status(400).send({message: "Authorization token was expired or was not valid"});
                return;
            }
            req.user = await User.findOne({ _id: _id }).lean().exec();
            next();
        }
    };
}


module.exports = new Authenticate();
