const mongoose  =  require ( 'mongoose' ) ;
const Schema  =  mongoose.Schema;

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


const messageSchema  =  new Schema (
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        seenBy: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        chat: {
            type: Schema.Types.ObjectId,
            ref: "Chat"
        },
        content: {
            type: String,
        },
        messageAttachments: [
            {
                messageAttachmentSchema,
                required: false
            }
        ],
        messageReactions: [
            {
                messageReactionSchema,
                required: false
            }
        ]
    },
    {
        timestamps: true
    });

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
