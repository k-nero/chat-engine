const Chat = require('../models/chat');
const User = require('../models/users');

class ChatController
{
    constructor()
    {
        this.createChat = this.createChat.bind(this);
        this.renameChat = this.renameChat.bind(this);
        this.leaveChat = this.leaveChat.bind(this);
        this.getMembers = this.getMembers.bind(this);
    }

    async createChat(req, res)
    {
        try
        {
            const payload = {
                users: [],
                chatAdmin: req.user,
                chatName : req.body.chatName
            }

            for (let i = 0; i < req.body.users.length; i++)
            {
               let user = await User.findOne({username: req.body.users[i]}).lean(true).exec();
               payload.users.push(user);
            }

            if(payload.chatName === undefined)
            {
                payload.chatName = payload.users.map(user => user.fullName).join(", ");
            }

            payload.users.push(req.user);
            const newChat = await Chat.create({ members: payload.users, chatAdmin: payload.chatAdmin, chatName: payload.chatName });
            res.status(201).send({ message: "Succeed", data: newChat });
        }
        catch (err)
        {
            res.status(500).send({ message: err.message });
        }
    }

    async renameChat(req, res)
    {
        try
        {
            let chatId = req.body.chatId;
            let chatName = req.body.chatName;
            let chat = await Chat.findById(chatId).populate("chatAdmin", "_id");
            if(chat.chatAdmin._id.toString() !== req.user._id)
            {
                res.status(401).send({ message: "You are not the admin of this chat" });
                return;
            }
            chat.chatName = chatName;
            chat = await chat.save();
            res.status(200).send({ message: "Succeed", data: chat });

        }
        catch (err)
        {
            res.status(500).send({ message: err.message });
        }
    }

    async getAllMessages(req, res)
    {
        try
        {
            const chatId = req.params.chatId;
            const chat = await Chat.findById(chatId).populate("messages").lean().exec();
            res.status(200).send({ message: "Succeed", data: chat.messages });
        }
        catch (err)
        {
            res.status(500).send({ message: err.message });
        }
    }

    async leaveChat(req, res)
    {
        try
        {
            const payload = {
                chatId: req.body.chatId,
                userId: req.user._id,
                targetUser: req.body.targetUser
            }

            const chat = await Chat.findById(payload.chatId).populate("members", "_id").populate("chatAdmin", "_id").lean().exec();

            if(payload.targetUser !== payload.userId)
            {
                if(chat.chatAdmin._id.toString() !== payload.userId.toString())
                {
                    res.status(401).send({ message: "You are not the admin of this chat" });
                    return;
                }
                chat.members.splice(chat.members.findIndex(member => member._id.toString() === payload.targetUser), 1);
                if(chat.members.length === 0)
                {
                    //await Chat.findByIdAndDelete(payload.chatId);
                }
            }
            else
            {
                chat.members.splice(chat.members.findIndex(member => member._id.toString() === payload.userId), 1);
                if(chat.members.length === 0)
                {
                    //await Chat.findByIdAndDelete(payload.chatId);
                }
            }
            const user = await User.findById(payload.targetUser);
            user.chats.splice(user.chats.findIndex(chat => chat._id.toString() === payload.chatId), 1);
            await user.save();
            res.status(200).send({ message: "Succeed" });

        }
        catch (err)
        {
            res.status(500).send({ message: err.message });
        }
    }

    async getMembers(req, res)
    {
        try
        {
            //TODO: Check if user is a member of the chat, avoid sending all info
            const chat = await Chat.findById(req.params.chatId).populate("members").lean().exec();
            const members = {
                members: chat.members.map(member => {
                    return {
                        _id: member._id,
                        fullName: member.fullName,
                        username: member.username,
                        pic: member.pic
                    }
                })
            }
            res.status(200).send({ message: "Succeed", data: members.members })
        }
        catch (err)
        {
            res.status(500).send({ message: err.message });
        }
    }
}

module.exports = new ChatController();
