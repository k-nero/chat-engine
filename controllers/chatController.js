const Chat = require('../models/chat');

class ChatController
{
    constructor()
    {
        this.createChat = this.createChat.bind(this);
    }

    async createChat(req, res, next)
    {
        try
        {
            const payload = {
                users: req.body.users,
                chatAdmin: req.user,
                chatName : req.body.chatName
            }

            if(!payload.chatName)
            {
                payload.chatName = payload.users.map(user => user.fullName).join(", ");
            }

            payload.users.push(req.user);
            const newChat = await Chat.create({ users: payload.users, chatAdmin: payload.admin, chatName: payload.chatName });
            res.status(201).send({ message: "Succeed", data: newChat });
        }
        catch (err)
        {
            res.status(500).send({ message: err.message });
        }
    }

    async renameChat(req, res, next)
    {
        try
        {
            let chatId = req.body.chatId;
            let chat = await Chat.findById(chatId).populate("admin", "_id");
            if(chat.chatAdmin._id === req.user._id)
            {
                chat.chatName = req.body.chatName;
                await chat?.save();
            }
            res.status(200).send({ message: "Succeed", data: chat });
        }
        catch (err)
        {
            res.status(500).send({ message: err.message });
        }
    }

    async getAllMessages(req, res, next)
    {
        try
        {
            const chatId = req.params.chatId;
            const messages = Chat.findById(chatId).populate("messages");
            res.status(200).send({ message: "Succeed", data: messages });
        }
        catch (err)
        {
            res.status(500).send({ message: err.message });
        }
    }

    async leaveChat(req, res, next)
    {
        try
        {

        }
        catch (err)
        {
            res.status(500).send({ message: err.message });
        }
    }
}

module.exports = new ChatController();
