
const Song = require("../models/Song");
const mongooseObjectHandler = require("../../ultis/mongoose");
const fs = require('fs');

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
        Song.find()
            .then((songs) => {
                res.render("songs/index", {
                    songs: mongooseObjectHandler.multiple(songs)
                });
            })
            .catch(next);
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

        const newSong = new Song({ ...req.body });
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

}


module.exports = new SongsControler;