const Chat = require('../models/chat');
const User = require('../models/users');
const Message = require('../models/message');
const UserCache = require('../models/user.cache.js');
const WebSocket = require('../socket.IO/socket').WebSocket;

class ChatController
{
    constructor()
    {
        this.createChat = this.createChat.bind(this);
        this.renameChat = this.renameChat.bind(this);
        this.leaveChat = this.leaveChat.bind(this);
        this.getMembers = this.getMembers.bind(this);
        this.getChatInfo = this.getChatInfo.bind(this);
        this.addMembers = this.addMembers.bind(this);
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

            payload.users.push(req.user);

            let chat = await Chat.find({ members: { $all: payload.users } }).lean(true).exec();
            if(chat.length > 0)
            {
                res.status(304).send({ message: "Chat already exists", data: chat[0] });
                return;
            }

            if(payload.chatName === undefined && payload.users.length > 2)
            {
                payload.chatName = payload.users.map(user => user.fullName).join(", ");
                //payload.chatAvatar = payload.users[0].pic;
            }

            const newChat = await Chat.create({ members: payload.users, chatAvatar: payload?.chatAvatar, chatAdmin: payload.chatAdmin, chatName: payload.chatName });
            for (let i = 0; i < payload.users.length; i++)
            {
                for(let k = 0; k < WebSocket.users.length; k++)
                {
                    if(WebSocket.users[k].username === payload.users[i].username.toString())
                    {
                        const socket = io.sockets.sockets.get(WebSocket.users[k].id);
                        socket.join(newChat._id);
                    }
                }
                const user = await User.findById(payload.users[i]._id);
                user.chats.push(newChat._id);
                await user.save();

                {
                    let cacheUser = await UserCache.fetch(user._id);
                    if (cacheUser._id)
                    {
                        cacheUser.chats.push(newChat._id.toString());
                    }
                    else
                    {
                        cacheUser = JSON.parse(JSON.stringify(user));
                    }
                    cacheUser = await UserCache.save(cacheUser._id, cacheUser);
                }
            }
            io.sockets.in(newChat._id).emit("new-chat", newChat);
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
            io.sockets.in(chatId).emit("renameChat", chatName);
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
            const chat = await Chat.findById(chatId).populate({
                path: "messages",
                populate: {
                    path: "sender",
                    select: "fullName pic"
                }
            }).lean().exec();
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
                    const chat = await Chat.findByIdAndDelete(payload.chatId);
                    for (let i = 0; i < chat.messages.length; i++)
                    {
                       await Message.findByIdAndDelete(chat.messages[i]);
                    }
                }
            }
            else
            {
                chat.members.splice(chat.members.findIndex(member => member._id.toString() === payload.userId), 1);
                if(chat.members.length === 0)
                {
                    const chat = await Chat.findByIdAndDelete(payload.chatId);
                    for (let i = 0; i < chat.messages.length; i++)
                    {
                        await Message.findByIdAndDelete(chat.messages[i]);
                    }
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

    async addMembers(req, res)
    {
        try
        {

        }
        catch (err)
        {
            res.status(500).send({ message: err.message });
        }
    }

    async getChatInfo(req, res)
    {
        try
        {
            const chatId = req.params.chatId;
            const chat = await Chat.findById(chatId).populate({
                path: "members",
                select: "fullName pic",
                match : { _id: { $ne: req.user._id } }
            }).lean().exec();
            if(!chat)
            {
                res.status(404).send({ message: "Chat not found" });
                return;
            }
            res.status(200).send({ message: "Succeed", data: chat });
        }
        catch (err)
        {
            res.status(500).send({ message: err.message });
        }
    }
}

module.exports = new ChatController();
