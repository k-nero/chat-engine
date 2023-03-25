const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chatSchema = new Schema(
    {
        chatName: {
            type: String,
        },
        latestMessage: {
            type: Schema.Types.ObjectId,
            ref: "Message"
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true
            }
        ],
        messages: [
            {
                type: Schema.Types.ObjectId,
                ref: "Message"
            }
        ],
        chatAdmin: {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    },
    {
        timestamps: true
    });

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
