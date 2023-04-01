const Message = require("../models/message");
const Chat = require("../models/chat");


class MessageController
{

    constructor()
    {
        this.newMessage = this.newMessage.bind(this);
        this.recallMessage = this.recallMessage.bind(this);
        this.mediaMessage = this.mediaMessage.bind(this);
        this.reactMessage = this.reactMessage.bind(this);
        this.editMessage = this.editMessage.bind(this);
    }

    async newMessage(req, res)
    {
        try
        {
            const payload = {
                sender: req.user._id,
                content: req.body.content,
            }

            if(payload.content === undefined )
            {
                res.status(400).send({ message: "Message content or attachment is required" });
                return;
            }

            const newMessage = await Message.create({sender: payload.sender, content: payload.content});
            const chat = await Chat.findById(payload.chat);
            chat.lastMessage = newMessage;
            chat.messages.push(newMessage);
            await chat.save();
            res.status(201).send({message: "Succeed", data: newMessage});
        }
        catch (err)
        {
            res.status(500).send({ message: err.message });
        }
    }

    async mediaMessage(req, res)
    {
        try
        {
            const messageId = req.params.messageId
            const payload = {
                type: req.body.type,
                path: req.file.path
            };

            if(payload.type === undefined || payload.path === undefined)
            {
                res.status(400).send({ message: "Attachment type is required" });
                return;
            }

            const message = await Message.findById(messageId);
            message.messageAttachments.push({type: payload.type, path: payload.path});
            await message.save();
            res.status(201).send({message: "Succeed", data: message});
        }
        catch (err)
        {
            res.status(500).send({ message: err.message });
        }
    }

    async editMessage(req, res)
    {
        try
        {
            const messageId = req.params.messageId
            const payload = {
                content: req.body.content
            };

            if(payload.content === undefined)
            {
                res.status(400).send({ message: "Message content is required" });
                return;
            }

            const message = await Message.findById(messageId);
            message.content = payload.content;
            await message.save();
            res.status(201).send({message: "Succeed", data: message});
        }
        catch (err)
        {
            res.status(500).send({ message: err.message });
        }
    }

    async reactMessage(req, res)
    {
        try
        {
            const messageId = req.params.messageId
            const payload = {
                type: req.body.type,
                sender: req.user._id
            };

            if(payload.type === undefined || payload.sender === undefined)
            {
                res.status(400).send({ message: "Reaction type is required" });
                return;
            }

            const message = await Message.findById(messageId);
            message.messageReactions.push({type: payload.type, sender: payload.sender});
            await message.save();
            res.status(201).send({message: "Succeed", data: message});
        }
        catch (err)
        {
            res.status(500).send({ message: err.message });
        }
    }

    async recallMessage(req, res)
    {
        try
        {
            const messageId = req.params.messageId;
            const chatId = req.params.chatId;
            await Message.findByIdAndDelete(messageId);
            const chat = await Chat.findById(chatId);
            chat.messages.pop(messageId);
            chat.save();
            res.status(200).send({ message: "Succeed" });
        }
        catch (err)
        {
            res.status(500).send({ message: err.message });
        }
    }
}

module.exports = new MessageController();
