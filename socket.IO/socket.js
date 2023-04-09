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
        console.log("Client connected");

        await this.disconnect(socket);
    }

    async disconnect(socket)
    {
        socket.on("disconnect", () =>
        {
            console.log("Client disconnected");
        });

    }
}

module.exports = new WebSocket();
