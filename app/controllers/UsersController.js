
const User = require("../models/User");
const mongooseObjectHandler = require("../../ultis/mongoose");

class UsersControler {
    //APIs
    //[get]: /users
    getAll(req, res, next) {
        // res.render("songs/index");
        User.find()
            .then((users) => {
                res.json(users);
            })
            .catch(next);
    }

    //ACTIONs
    //[get]: /songs
    index(req, res, next) {

        const listUsers = User
            .find()
            .paging(req)
            .searching(req)

        const countDeleteUsers = User.countDeleted();
        const countTotalUsers = User.count();

        const size = req.query._size || 1;

        Promise.all([listUsers, countDeleteUsers, countTotalUsers])
            .then(([listUsers, countDelete, totalUsers]) => {

                res.render("users/index", {
                    listUsers: mongooseObjectHandler.multiple(listUsers),
                    countDelete,
                    pageCount: req.query.hasOwnProperty("searchText")
                        ? 1
                        : Math.ceil(totalUsers / size),
                });
            })
            .catch(next);
    }

    //[get]: /users/create
    create(req, res, next) {
        res.render("users/create");
    }

    //[post]: /users/store
    store(req, res, next) {
        //nhận file audio từ form
        const file = req.file;
        if (!file) {
            const error = new Error('Upload file again!')
            error.httpStatusCode = 400
            return next(error)
        }

        const newUser = new User({
            ...req.body,
        });
        newUser.save()
            .then(() => res.redirect("/users"));
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