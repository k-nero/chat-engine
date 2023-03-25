const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const messageReactionSchema = new Schema(
    {
        type: {
            type: String,
            required: true
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    });

const MessageReaction = mongoose.model("MessageReaction", messageReactionSchema);
module.exports = MessageReaction;
