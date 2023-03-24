const mongoose  =  require ( 'mongoose' ) ;
const schema  =  mongoose.Schema;
const messageSchema  =  new schema (
    {
        sender: {
            type: schema.Types.ObjectId,
            ref: "User"
        },
        seenBy: [
            {
                type: schema.Types.ObjectId,
                ref: "User"
            }
        ],
        chat: {
            type: schema.Types.ObjectId,
            ref: "Chat"
        },
        content: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    });

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
