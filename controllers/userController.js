const User = require("../models/users");

class UserController
{
    constructor()
    {
        this.getUserInfo = this.getUserInfo.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.getChatList = this.getChatList.bind(this);
        this.getFriendList = this.getFriendList.bind(this);
        this.addFriend = this.addFriend.bind(this);
        this.getUserProfile = this.getUserProfile.bind(this);
    }

    async getUserProfile(req, res)
    {
        try
        {
            if(req.params.userId)
            {
                const user = await User.findOne({ _id: req.params.userId }).lean().exec();
                if (!user)
                {
                    res.status(400).send({ message: "User not found" });
                    return;
                }
                res.status(200).send(user);
            }
        }
        catch (err)
        {
            res.status(500).send({ message: err.message });
        }
    }

    async getUserInfo(req, res)
    {
        try
        {
            const user = await User.findOne({ _id: req.user._id }).lean().exec();
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

    async updateUser(req, res)
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
            const newUser = await User.findByIdAndUpdate(req.user._id, newUserInfo, { new: true }).lean().exec();
            res.status(200).send(newUser);
        }
        catch (err)
        {
            res.status(500).send({ message: err.message });
        }
    }

    async getChatList(req, res)
    {
        try
        {
            const user = await User.findOne({ _id: req.user._id }).populate({
                path: "chats",
                select: "chatName chatAvatar",
                populate: [{
                    path: "lastMessage",
                    select: "content createdAt",
                    populate: {
                        path: "sender",
                        select: "fullName pic"
                    },
                },
                {
                    path: "members",
                    select: "fullName pic",
                    match: { _id: { $ne: req.user._id } }
                }]

            }).lean().exec();
            if (!user)
            {
                res.status(400).send({ message: "User not found" });
                return;
            }
            res.status(200).send(user.chats);
        }
        catch (err)
        {
            res.status(500).send({ message: err.message });
        }
    }

    async getFriendList(req, res)
    {
        try
        {
            const user = await User.findOne({ _id: req.user.id }).populate("friends", "fullName pic").lean().exec();
            if (!user)
            {
                res.status(400).send({ message: "User not found" });
                return;
            }
            res.status(200).send(user.friends);
        }
        catch (err)
        {
            res.status(500).send({ message: err.message });
        }
    }

    async addFriend(req, res)
    {
        try
        {
            const friend = await User.findOne({ _id: req.params.userId });
            if (!friend)
            {
                res.status(400).send({ message: "User not found" });
                return;
            }
            const user = await User.findOne({ _id: req.user._id });
            user.friends.push(friend);
            await user.save();
            res.status(200).send({ message: "Succeed" });
        }
        catch (err)
        {
            res.status(500).send({ message: err.message });
        }
    }

}

module.exports = new UserController();
