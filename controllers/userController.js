const User = require("../models/users");

class UserController
{
    constructor()
    {
        this.getUser = this.getUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.getChatList = this.getChatList.bind(this);
        this.getFriendList = this.getFriendList.bind(this);
    }

    async getUser(req, res, next)
    {
        try
        {
            const user = await User.findOne({ _id: req.user.id });
            if (!user)
            {
                res.status(400).send({ message: "User not found" });
                return;
            }
            res.status(200).send(user);
        }
        catch (err)
        {
            res.status(500).send({ message: err.message });
        }
    }

    async updateUser(req, res, next)
    {
        try
        {
            const user = await User.findOne({ _id: req.user.id });
            if (!user)
            {
                res.status(400).send({ message: "User not found" });
                return;
            }
            const newUserInfo = req.body;
            const newUser = await User.findByIdAndUpdate(req.user._id, newUserInfo, { new: true });
            res.status(200).send(newUser);
        }
        catch (err)
        {
            res.status(500).send({ message: err.message });
        }
    }

    async getChatList(req, res, next)
    {
        try
        {
            const user = await User.findOne({ _id: req.user.id });
            if (!user)
            {
                res.status(400).send({ message: "User not found" });
                return;
            }
            const chatList = await User.findOne({ _id: req.user.id }).populate("chats", "latestMessage");
            res.status(200).send(chatList);
        }
        catch (err)
        {
            res.status(500).send({ message: err.message });
        }
    }

    async getFriendList(req, res, next)
    {
        try
        {
            const user = await User.findOne({ _id: req.user.id });
            if (!user)
            {
                res.status(400).send({ message: "User not found" });
                return;
            }
            const friendList = await User.findOne({ _id: req.user.id }).populate("friends", "fullName pic");
            res.status(200).send(friendList);
        }
        catch (err)
        {
            res.status(500).send({ message: err.message });
        }
    }
}

export default UserController;
