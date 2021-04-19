var express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controller');
const { createRoleValidate, validate } = require('../validators/createRole.validate');

router.get('/edit/:id', roleController.edit);
router.post('/update/:id', roleController.update);
router.post('/delete/:id', roleController.deleted);
router.post('/create', createRoleValidate(), validate, roleController.create);
router.get('/list-role', roleController.show)

module.exports = router;