const songsRouter = require("./songs");

function route(app) {
    app.use("/songs", songsRouter);



    app.use("/api/songs", songsRouter);
}

module.exports = route;