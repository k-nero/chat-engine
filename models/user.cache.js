const redis_OM = require("redis-om")
const Schema = redis_OM.Schema;
const redis = require('../config/redis.js');
const {Repository} = require("redis-om");

const userSchema = new Schema('User',
    {
        _id: { type: 'string' },
        fullName: { type: 'string' },
        phone: { type: 'string' },
        username: {type: 'string' },
        password: { type: 'string' },
        email: { type: 'string' },
        pic: {type: 'string' },
        chats: { type: 'string[]' },
        friends: { type: 'string[]' }
    },
    {
        dataStructure: 'JSON'
    }
);

const userRepository = new Repository(userSchema, redis);
module.exports = userRepository;
