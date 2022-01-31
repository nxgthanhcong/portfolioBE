const express = require('express');
const router = express.Router();

const upload = require("../ultis/upload-songs");


//import actions from controller
const songsController = require("../app/controllers/SongsController");

router.get('/', songsController.index);
router.get('/get-all', songsController.getAll);
router.get('/create', songsController.create);
router.post('/store', upload.single("audio"), songsController.store);
router.get('/edit/:id', songsController.edit);
router.get('/delete/:id', songsController.delete);
router.post('/update', songsController.update);
router.get('/trash', songsController.trash);
router.get('/restore/:id', songsController.restore);

module.exports = router;