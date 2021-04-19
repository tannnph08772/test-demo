var express = require('express');
const router = express.Router();
const staffController = require('../controllers/staff.controller');
const { createStaffValidate, validate } = require('../validators/createStaff.validate');

router.get('/edit/:id', staffController.edit);
router.post('/update/:id', staffController.update);
router.post('/delete/:id', staffController.deleted);
router.post('/create', createStaffValidate(), validate, staffController.create);
router.get('/list-staff', staffController.show)
router.post('/login', staffController.loginStaff);

module.exports = router;