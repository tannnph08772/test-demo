const Product = require('../models/product.model')
const CartItem = require('../models/cartItem.model')

const checkPostCart = async(req, res, next) => {
    // req.locals ? req.locals : {};
    const prodId = req.body.productId;

    req.locals = await req.user.getCart()
        .then(cart => {
            res.locals.cartId = cart.id;
            return cart.getProducts({
                where: {
                    id: prodId
                }
            });
        })
        .then(products => {
            let product;
            if (products.length > 0) {
                product = products[0];
            }
            if (product) {
                const oldQty = product.cartItem.quantity;
                console.log(oldQty)
                res.locals.newQty = oldQty + 1;
                return product;
            } else {
                return Product.findByPk(prodId);
            }
        })
    res.locals.cartItem = await CartItem.findOne({ where: { cartId: res.locals.cartId, productId: prodId } })
    return next();
}

module.exports = checkPostCart;