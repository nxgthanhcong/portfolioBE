const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

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

Song.plugin(AutoIncrement);

Song.plugin(mongooseDelete, { overrideMethods: 'all' });

module.exports = mongoose.model("Song", Song);