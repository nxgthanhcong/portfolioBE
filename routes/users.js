const express = require('express');
const router = express.Router();

const upload = require("../ultis/upload-users-image");


//import actions from controller
const usersController = require("../app/controllers/UsersController");

router.get('/', usersController.index);
router.get('/get-all', usersController.getAll);
router.get('/create', usersController.create);
router.post('/store', upload.single("audio"), usersController.store);
router.get('/edit/:id', usersController.edit);
router.get('/delete/:id', usersController.delete);
router.post('/update', usersController.update);
router.get('/trash', usersController.trash);
router.get('/restore/:id', usersController.restore);

module.exports = router;