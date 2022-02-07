const songsRouter = require("./songs");
const socialsRouter = require("./socials");

function route(app) {
    //songs route configs
    app.use("/songs", songsRouter);
    app.use("/api/songs", songsRouter);
    //socials route configs
    app.use("/socials", socialsRouter);
    app.use("/api/socials", socialsRouter);
}

module.exports = route;