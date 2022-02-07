
const Social = require("../models/Social");
const mongooseObjectHandler = require("../../ultis/mongoose");

class SocialsControler {
    //APIs
    //[get]: /songs
    getAll(req, res, next) {
        Social.find()
            .then((socials) => {
                res.json(socials);
            })
            .catch(next);
    }

    //ACTIONs
    //[get]: /socials
    index(req, res, next) {

        const listSocials = Social
            .find()
            .paging(req)
            .searching(req)

        const countDeleteSocials = Social.countDeleted();
        const countTotalSocials = Social.count();

        const size = req.query._size || 1;

        Promise.all([listSocials, countDeleteSocials, countTotalSocials])
            .then(([listSocials, countDelete, totalSocials]) => {

                res.render("socials/index", {
                    listSocials: mongooseObjectHandler.multiple(listSocials),
                    countDelete,
                    pageCount: req.query.hasOwnProperty("searchText")
                        ? 1
                        : Math.ceil(totalSocials / size),
                });
            })
            .catch(next);
    }

    //[get]: /socials/create
    create(req, res, next) {
        res.render("socials/create");
    }

    //[post]: /socials/store
    store(req, res, next) {

        const newSocial = new Social(req.body);
        newSocial.save()
            .then(() => res.redirect("/socials"));
    }

    //[get]: /socials/edit
    edit(req, res, next) {
        const socialId = req.params.id;

        Social.findOne({ _id: socialId })
            .then((social) => res.render("socials/edit", mongooseObjectHandler.one(social)))
            .catch(next);
    }

    //[post]: /socials/update
    update(req, res, next) {
        const social = req.body;

        // const file = req.file;
        // if (file) {
        //     fs.unlink("public/uploads/socials/" + social.slug);
        // }

        Social.updateOne({ _id: social._id }, req.body)
            .then(() => res.redirect("/socials"))
            .catch(next);
    }

    //[get]: /socials/delete
    delete(req, res, next) {
        const socialId = req.params.id;

        Social.delete({ _id: socialId })
            .then(() => res.redirect("/socials"))
            .catch(next);
    }

    //[get]: /socials/trash
    trash(req, res, next) {
        Social.findDeleted()
            .then((socials) => res.render("socials/trash", {
                socials: mongooseObjectHandler.multiple(socials)
            }))
            .catch(next);
    }

    //[get]: /socials/restore/:id
    restore(req, res, next) {
        const socialId = req.params.id;

        Social.restore({ _id: socialId })
            .then(() => res.redirect("back"))
            .catch(next);
    }

}


module.exports = new SocialsControler;