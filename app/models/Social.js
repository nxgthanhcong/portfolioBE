const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Social = new Schema({
    _id: Number,
    title: String,
    icon: String,
    color: String,
}, {
    _id: false
})


Social.query.searching = function (req) {
    if (req.query.hasOwnProperty("searchText")) {

        return this
            .find({ title: { $regex: '.*' + req.query.searchText + '.*', $options: 'i' } })
    }
    return this;
}

Social.query.paging = function (req) {
    if (req.query.hasOwnProperty("_page")) {

        const itemsPerPage = req.query._size;
        const page = req.query._page;

        return this
            .skip((itemsPerPage * page) - itemsPerPage)
            .limit(itemsPerPage);
    }
    return this;
}

Social.plugin(AutoIncrement, { id: 'social_increment', inc_field: '_id' });

Social.plugin(mongooseDelete, { overrideMethods: 'all' });

module.exports = mongoose.model("Social", Social);