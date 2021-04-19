const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = (req, res, next) => {
    console.log('aaaaaa11111');
    const password = req.body.password;
    console.log('aaaa')
    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function(err, result) {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }
                    if (result) {
                        let token = jwt.sign({ username: user.username }, 'AzQ,PI)0(', { expiresIn: "1h" });
                        res.json({
                            massage: "Login Successfully!",
                            token
                        })
                    } else {
                        res.json({
                            massage: 'Password does not matched'
                        })
                    }

                })
            } else {
                res.json({
                    massage: 'Not user found'
                })
            }
        })
}

const logout = (req, res, next) => {
    req.logout();
    return res.send("Bạn đã logout");
}

module.exports = { login, logout }