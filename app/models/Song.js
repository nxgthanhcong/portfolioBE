const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Song = new Schema({
    _id: Number,
    name: String,
    singer: String,
    image: String,
    audio: String,
    audioSlug: String
}, {
    _id: false
})

Song.query.sortable = function (req) {
    if (req.query.hasOwnProperty("_sort")) {
        const isValidType = ["desc", "asc"].includes(req.query.type);

        return this.sort({
            [req.query.column]: isValidType ? req.query.type : "desc"
        })
    }
    return this;
}

Song.query.searching = function (req) {
    if (req.query.hasOwnProperty("searchText")) {

        return this
            .find({ name: { $regex: '.*' + req.query.searchText + '.*', $options: 'i' } })
    }
    return this;
}

Song.query.paging = function (req) {
    if (req.query.hasOwnProperty("_page")) {

        const itemsPerPage = req.query._size;
        const page = req.query._page;

        return this
            .skip((itemsPerPage * page) - itemsPerPage)
            .limit(itemsPerPage);
    }
    return this;
}

Song.plugin(AutoIncrement);

Song.plugin(mongooseDelete, { overrideMethods: 'all' });

module.exports = mongoose.model("Song", Song);