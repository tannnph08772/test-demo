var express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/:id', userController.edit);
router.post('/update/:id', userController.update);
router.post('/delete/:id', userController.deleted);
router.post('/create', userController.create);
router.get('/', userController.getUsers)

module.exports = router;