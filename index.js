const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const db = require('./database/connection')
const passport = require('passport');
const session = require('express-session');
const router = require('./src/api/routes/index.route');
const Product = require('./src/api/models/product.model');
const User = require('./src/api/models/user.model');
const Cart = require('./src/api/models/cart.model');
const CartItem = require('./src/api/models/cartItem.model');
const Order = require('./src/api/models/order.model').Order;
const OrderItem = require('./src/api/models/orderItem.model');
const Category = require('./src/api/models/category.model').Category;
const Payment = require('./src/api/models/payment.model').Payment;
const initializePassport = require("./src/api/middlewares/passport.middleware.js");
initializePassport(passport);

Category.hasMany(Product, {
    as: "products",
    foreignKey: 'cateId'
});

Product.belongsTo(Category, {
    as: "products",
    foreignKey: 'cateId'
});

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, {
    through: CartItem
});
Product.belongsToMany(Cart, {
    through: CartItem
});

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product, {
    through: OrderItem
});

Product.belongsToMany(Order, {
    through: OrderItem
});

Payment.belongsTo(Order);
Order.hasMany(Payment);


app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false, cookie: { maxAge: 24 * 60 * 60 * 1000 } }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname)));

router(app);

app.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})