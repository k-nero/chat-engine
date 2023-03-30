/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");

class Authenticate
{

    constructor()
    {
        this.authenticate = this.authenticate.bind(this);
        this.verifyToken = this.verifyToken.bind(this);
    }

    async verifyToken(token)
    {
      try
      {
        return await jwt.verify(token, process.env.JWT_SECRET);
      }
        catch (err)
        {
            throw err;
        }
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
            if (token.iat + 720 * 60 < Date.now() / 1000)
            {
                res.status(400).send({message: "Authorization token was expired or was not valid"});
                return;
            }
            let user;
            try
            {
                user = await this.verifyToken(token);
            }
            catch (err)
            {
                res.status(400).send({message: "Authorization token was expired or was not valid"});
                return;
            }
            req.user = user.user;
            next();
        }
    };
}


module.exports = new Authenticate();
