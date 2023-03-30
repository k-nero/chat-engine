const Message = require("../models/Message");
const Chat = require("../models/Chat");

class MessageController
{

    constructor()
    {
        this.newMessage = this.newMessage.bind(this);
    }

    async newMessage(req, res, next)
    {
        try
        {
            const payload = {
                sender: req.user._id,
                chat: req.body.chatId,
                content: req.body.content,

            }

            const messageAttachment = {
                attachment: req.file?.path,
                attachmentType: req.body.attachmentType
            };

            if(payload.content === undefined && messageAttachment.attachment === undefined)
            {
                res.status(400).send({ message: "Message content or attachment is required" });
                return;
            }

            const newMessage = await Message.create({sender: payload.sender, chat: payload.chat, content: payload.content, attachment: messageAttachment});
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

    async editMessage(req, res, next)
    {

    }

    async reactMessage(req, res, next)
    {
        try
        {

        }
        catch (err)
        {
            res.status(500).send({ message: err.message });
        }
    }

    async recallMessage(req, res, next)
    {
        try
        {
            const messageId = req.body.messageId;
            const chatId = req.body.chatId;
            await Message.findByIdAndDelete(messageId);
            await Chat.findById(chatId).messages.pop(messageId);
            res.status(200).send({ message: "Succeed" });
        }
        catch (err)
        {
            res.status(500).send({ message: err.message });
        }
    }
}

module.exports = new MessageController();
