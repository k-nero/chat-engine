/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");

const verifyToken = (token) =>
{
    return new Promise((resolve, reject) =>
    {
        jwt.verify(token, process.env.JWT_SECRET, function (err, user)
        {
            if (err)
            {
                return reject(err);
            }
            return resolve(user);
        });
    });
};

const authenticate = async (req, res, next) =>
{
    const token = req.headers.authorization.split(" ")[1];
    if (token !== "null")
    {
        if (token.iat + 1440 * 60 < Date.now() / 1000)
        {
            res.status(400).send({ message: "Authorization token was expired or was not valid" });
            return;
        }
        let user;
        try
        {
            user = await verifyToken(token);
        }
        catch (err)
        {
            res.status(400).send({ message: "Authorization token was expired or was not valid" });
            return;
        }
        req.user = user.user;
        next();
    }
};

module.exports = authenticate;
