class ValidateUserInfo
{
    constructor()
    {
        this.validateLogin = this.validateLogin.bind(this);
        this.validateRegister = this.validateRegister.bind(this);
        this.validateNewMessage = this.validateNewMessage.bind(this);
    }

    static validateLogin(req, res, next)
    {
        const { username, password } = req.body;
        if (!username || !password)
        {
            res.status(400).send({ message: "Username and password are required" });
            return;
        }
        next();
    }

    static validateRegister(req, res, next)
    {
        const { username, password, email, fullName } = req.body;
        if (!username || !password || !email || !fullName)
        {
            res.status(400).send({ message: "Username, password, email and full name are required" });
            return;
        }

        if (username.match(/^[a-zA-Z0-9]+$/) === null)
        {
            res.status(400).send({ message: "Username must be alphanumeric" });
            return;
        }

        let regex = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,}$/;

        if(password.match(regex) === null)
        {
            res.status(400).send({ message: "Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter and one number" });
            return;
        }

        next();
    }

    static validateNewMessage(req, res, next)
    {
        if(!req.user._id)
        {
            res.status(401).send({ message: "Unauthorized" });
            return;
        }
        if(!req.body.chatId)
        {
            res.status(400).send({ message: "Chat ID is required" });
            return;
        }
        if(!req.body.content && !req.file?.path)
        {
            res.status(400).send({ message: "Message content is required" });
            return;
        }
        next();
    }
}

module.exports = new ValidateUserInfo();
