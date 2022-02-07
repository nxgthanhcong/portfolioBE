const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const User = new Schema({
    _id: Number,
    email: String,
    password: String,
    image: String,
    jobs: Array,
    breifDescription: String,
    description: String,
    birthDay: String,
    webSite: String,
    phone: String,
    city: String,
    age: Number,
    degree: String,
    bFreelance: Boolean,
    highlights: Array,
    skills: Array,
    interests: Array,
    testimonials: Array,
}, {
    _id: false
})

User.plugin(AutoIncrement, { id: 'user_increment', inc_field: '_id' });

User.plugin(mongooseDelete, { overrideMethods: 'all' });

module.exports = mongoose.model("User", User);