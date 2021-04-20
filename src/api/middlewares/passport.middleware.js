const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user.model')

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        return done(null, user.id);
    })

    passport.deserializeUser(function(id, done) {
        User.findByPk(id).then((user) => {
            return done(null, user);
        });
    })

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        async function(email, password, done) {
            var user = await User.findOne({
                where: {
                    email: email
                }
            });
            if (user == null) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            if (!user.password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        }
    ));
}