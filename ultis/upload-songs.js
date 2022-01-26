const multer = require('multer');
const path = require("path");
const generateSlug = require("./generate-slug");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/songs/')
    },
    filename: function (req, file, cb) {
        req.body.audioSlug = generateSlug(req.body.name);
        cb(null, req.body.audioSlug + path.extname(file.originalname)) //Appending extension
    }
})

const upload = multer({ storage: storage });

module.exports = upload;