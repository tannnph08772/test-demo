module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.send('Vui lòng đăng nhập');
}