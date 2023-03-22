/* eslint-disable no-undef */
const mongoose = require("mongoose");

module.exports = (app, url) =>
{
    mongoose?.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => console.log("MongoDB connected")).catch(err => console.log(err));
    mongoose.Promise = global.Promise;
    process.on("SIGINT", cleanup);
    process.on("SIGTERM", cleanup);
    process.on("SIGHUP", cleanup);
    if (app)
    {
        app.set("mongoose", mongoose);
    }
};
function cleanup ()
{
    mongoose?.connection.close(function ()
    {
        process.exit(0);
    });
}
