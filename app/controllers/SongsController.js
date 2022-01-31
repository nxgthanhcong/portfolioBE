
const Song = require("../models/Song");
const mongooseObjectHandler = require("../../ultis/mongoose");

class SongsControler {
    //APIs
    //[get]: /songs
    getAll(req, res, next) {
        // res.render("songs/index");
        Song.find()
            .then((songs) => {
                res.json(songs);
            })
            .catch(next);
    }

    //ACTIONs
    //[get]: /songs
    index(req, res, next) {

        const songs = Song.find();
        const deleteSongs = Song.countDeleted();

        Promise.all([songs, deleteSongs])
            .then(([listSongs, countDelete]) => {
                res.render("songs/index", {
                    listSongs: mongooseObjectHandler.multiple(listSongs),
                    countDelete
                });
            })
            .catch(next);

        // Song.find()
        //     .then((songs) => {
        //         res.render("songs/index", {
        //             songs: mongooseObjectHandler.multiple(songs)
        //         });
        //     })
        //     .catch(next);
    }

    //[get]: /songs/create
    create(req, res, next) {
        res.render("songs/create");
    }

    //[post]: /songs/store
    store(req, res, next) {
        //nhận file audio từ form
        const file = req.file;
        if (!file) {
            const error = new Error('Upload file again!')
            error.httpStatusCode = 400
            return next(error)
        }

        const newSong = new Song({
            ...req.body,
            audioSlug: `/uploads/songs/${req.body.audioSlug}.mp3`,
            image: `https://i3.ytimg.com/vi/${req.body.image}/maxresdefault.jpg`,
        });
        newSong.save()
            .then(() => res.redirect("/songs"));
    }

    //[get]: /songs/edit
    edit(req, res, next) {
        const songId = req.params.id;

        Song.findOne({ _id: songId })
            .then((song) => res.render("songs/edit", mongooseObjectHandler.one(song)))
            .catch(next);
    }

    //[post]: /songs/update
    update(req, res, next) {
        const song = req.body;

        // const file = req.file;
        // if (file) {
        //     fs.unlink("public/uploads/songs/" + song.slug);
        // }

        Song.updateOne({ _id: song._id }, req.body)
            .then(() => res.redirect("/songs"))
            .catch(next);
    }

    //[get]: /songs/delete
    delete(req, res, next) {
        const songId = req.params.id;

        Song.delete({ _id: songId })
            .then(() => res.redirect("/songs"))
            .catch(next);
    }

    //[get]: /songs/trash
    trash(req, res, next) {
        Song.findDeleted()
            .then((songs) => res.render("songs/trash", {
                songs: mongooseObjectHandler.multiple(songs)
            }))
            .catch(next);
    }

    //[get]: /songs/restore/:id
    restore(req, res, next) {
        const songId = req.params.id;

        Song.restore({ _id: songId })
            .then(() => res.redirect("back"))
            .catch(next);
    }

}


module.exports = new SongsControler;