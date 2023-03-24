const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chatSchema = new Schema(
    {
        latestMessage: {
            type: Schema.Types.ObjectId,
            ref: "Message"
        },
        users: [
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
        ]
    },
    {
        timestamps: true
    });

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
