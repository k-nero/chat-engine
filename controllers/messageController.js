const MessageAttachment = require("../models/MessageAttachment");
const Message = require("../models/Message");
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
            if(!req.body.content)
            {
                res.status(400).send({ message: "Message content is required" });
                return;
            }
            const payload = {
                sender: req.user._id,
                chat: req.body.chatId,
                content: req.body.content,
                attachment: req.file?.path,
                attachmentType: req.body.attachmentType
            }
            let messageAttachment;
            if(payload.attachment && payload.attachmentType)
            {
                messageAttachment = await MessageAttachment.create({ path: payload.attachment, type: payload.attachmentType});
            }

            const newMessage = await Message.create({sender: payload.sender, chat: payload.chat, content: payload.content, attachment: messageAttachment._id});
            res.status(201).send({message: "Succeed", data: newMessage});
        }
        catch (err)
        {
            res.status(500).send({ message: err.message });
        }
    }
}

module.exports = new MessageController();
