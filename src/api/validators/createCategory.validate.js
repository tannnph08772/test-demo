const { body, validationResult } = require('express-validator')
const createCategoryValidate = () => {
    return [
        body('cateName', 'Tên danh mục không được để trống!').not().isEmpty(),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next();
    } else {
        const extractedErrors = errors.array().map(err => err);
        return res.json(extractedErrors);
    }

}

module.exports = {
    createCategoryValidate,
    validate,
}