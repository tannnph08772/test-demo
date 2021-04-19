const { body, validationResult } = require('express-validator')
const PaymentValidate = () => {
    return [
        body('paymentMethod', 'Phương thức thanh toán không được để trống!').not().isEmpty(),
        body('amount', 'Vui lòng nhập tiền thanh toán').not().isEmpty().isNumeric(),
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
    PaymentValidate,
    validate,
}