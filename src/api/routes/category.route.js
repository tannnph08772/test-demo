var express = require('express');
const router = express.Router();
const cateController = require('../controllers/category.controller');
const { createCategoryValidate, validate } = require('../validators/createCategory.validate');


router.get('/edit/:id', cateController.edit);
router.post('/update/:id', cateController.update);
router.post('/delete/:id', cateController.deleted);
router.post('/create', createCategoryValidate(), validate, cateController.create);
router.get('/list-category', cateController.show)

module.exports = router;