const multer = require('multer');
const path = require("path");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/users/')
    },
    filename: function (req, file, cb) {
        cb(null, req.body.email + path.extname(file.originalname)) //Appending extension
    }
})

const upload = multer({ storage: storage });

module.exports = upload;