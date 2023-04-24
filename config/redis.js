const redis = require('redis');

const client = redis.createClient({
    password: process.env.REDIS_PASS,
    socket: { host: process.env.REDIS_HOST, port: 11478 }
});

client.on('connect', () => {
    console.log('Redis client connected');
});

module.exports = client;
