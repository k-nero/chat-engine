const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const messageAttachmentSchema = new Schema(
    {
        type: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    });

const MessageAttachment = mongoose.model("MessageAttachment", messageAttachmentSchema);
module.exports = MessageAttachment;
