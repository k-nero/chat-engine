class WebSocket
{
    users = [];
    constructor()
    {
        this.connection = this.connection.bind(this);
        this.disconnect = this.disconnect.bind(this);
    }

    async connection(socket)
    {
        console.log("Client connected - " + socket.id);
        socket.on('join', (data) =>
            {
                //this.users.push({ id: socket.id, room: data.room });
              /*  this.users = this.users.filter((user, index, self) =>
                    index === self.findIndex((t) => (
                        t.room === user.room && t.id === user.id
                    )));*/
                console.log(this.users);
                socket.join(data.room);
          /*     socket.emit('users', this.users);
                socket.broadcast.emit('users', this.users);*/
            });
        await this.disconnect(socket);
    }

    async disconnect(socket)
    {
        socket.on("disconnect", () =>
        {
            console.log("Client disconnected - " + socket.id);
            socket.leave(socket.room);
        });

    }
}

module.exports = new WebSocket();
