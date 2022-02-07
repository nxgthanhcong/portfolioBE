const express = require('express');
const router = express.Router();

//import actions from controller
const socialsController = require("../app/controllers/SocialsController");

router.get('/', socialsController.index);
router.get('/get-all', socialsController.getAll);
router.get('/create', socialsController.create);
router.post('/store', socialsController.store);
router.get('/edit/:id', socialsController.edit);
router.get('/delete/:id', socialsController.delete);
router.post('/update', socialsController.update);
router.get('/trash', socialsController.trash);
router.get('/restore/:id', socialsController.restore);

module.exports = router;