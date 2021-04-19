const userRouter = require('./user.route');
const cateRouter = require('./category.route');
const staffRouter = require('./staff.route');
const roleRouter = require('./role.route');
const productRouter = require('./product.route');
const shopRouter = require('./shop.route');
const authRouter = require('./auth.route');

function route(app) {
    app.use('/api/user', userRouter);
    app.use('/api/category', cateRouter);
    app.use('/api/staff', staffRouter);
    app.use('/api/role', roleRouter);
    app.use('/api/product', productRouter);
    app.use('/api/shop', shopRouter);
    app.use('/api/auth', authRouter);
}

module.exports = route;