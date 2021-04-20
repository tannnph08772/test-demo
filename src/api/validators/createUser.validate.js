const { body, validationResult } = require('express-validator')
    // const Joi = require('joi');

const createUserValidate = () => {
    return [
        body('username', 'Tên không để trống!').not().isEmpty(),
        body('email', 'Email phải đúng định dạng và không được để trống').isEmail().not().isEmpty(),
        body('password', ' Vui lòng nhập password!').isLength({ min: 5 }).not().isEmpty(),
        body('phoneNumber', 'vui lòng nhập số điện thoại!').isLength({ max: 10 }).not().isEmpty().isNumeric(),
        body('address', 'Vui lòng nhập địa chỉ!').isLength({ min: 5 }).not().isEmpty(),
        body('birthday', 'Vui lòng chọn ngày sinh!').not().isEmpty(),
        body('sex', 'Vui lòng chọn giới tính!').not().isEmpty(),
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
    createUserValidate,
    validate,
}

// const authSchema = Joi.object({
//     username: Joi.string().required(),
//     email: Joi.string().email().required(),
//     password: Joi.required(),
//     phoneNumber: Joi.number().required(),
//     address: Joi.string().required(),
//     birthday: Joi.date().iso().required(),
//     sex: Joi.string().required(),
// })

// module.exports = { authSchema }