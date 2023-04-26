class WebSocket
{
    static users = [];
    constructor()
    {
        this.connection = this.connection.bind(this);
        this.disconnect = this.disconnect.bind(this);
    }

    async connection(socket)
    {
        console.log("Client connected - " + socket.id);
        socket.on('online', (data) =>
            {
                WebSocket.users.push({ id: socket.id, username: data.username });
                WebSocket.users = WebSocket.users.filter((user, index, self) => index === self.findIndex((t) => ( t.username === user.username )));
            })
        socket.on('join', (data) =>
            {
                //this.users.push({ id: socket.id, room: data.room });
              /*  this.users = this.users.filter((user, index, self) =>
                    index === self.findIndex((t) => (
                        t.room === user.room && t.id === user.id
                    )));*/
                socket.join(data.room);
          /*     socket.emit('users', this.users);
                socket.broadcast.emit('users', this.users);*/
            });
        socket.on('typing', (data) =>
        {
           socket.to(data.chatId).emit('typing', {fullName: data.fullName, chatId: data.chatId});
        });
        socket.on('stop-typing', (data) =>
        {
            socket.to(data.chatId).emit('stop-typing', {fullName: data.fullName, chatId: data.chatId});
        });
        await this.disconnect(socket);
    }

    async disconnect(socket)
    {
        socket.on("disconnect", () =>
        {
            console.log("Client disconnected - " + socket.id);
            socket.leave(socket.room);
            WebSocket.users = WebSocket.users.filter((user) => user.id !== socket.id);
        });

    }
}

module.exports = new WebSocket();
module.exports.WebSocket = WebSocket;
