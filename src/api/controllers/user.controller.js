const User = require('../models/user.model')
const Cart = require('../models/cart.model')
const bcrypt = require('bcrypt');

exports.getUsers = async(req, res, next) => {
    console.log(User)
    const allUser = await User.findAll({ include: Cart });
    res.json(allUser)
}

exports.create = async(req, res, next) => {
    const password = await bcrypt.hash(req.body.password, 10)
    User.create({
            username: req.body.username,
            email: req.body.email,
            password: password,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            birthday: req.body.birthday,
            sex: req.body.sex
        })
        .then(user => { res.json(user) })
        .catch(next);
}

exports.edit = async(req, res, next) => {
    const getUser = await User.getUser(req.params.id)
    res.json({ getUser })
}

exports.update = async(req, res, next) => {
    const { username, phoneNumber, email, birthday, sex, address } = req.body;
    const password = await bcrypt.hash(req.body.password, 10)
    User.User.update({ username: username, email: email, phoneNumber: phoneNumber, address: address, birthday: birthday, sex: sex, password: password }, { where: { id: req.params.id } })
        .then(() => {
            res.send("Data was Updated");
        })
        .catch((err) => {
            console.log("Error : ", err)
        });
}

exports.deleted = async(req, res, next) => {
    try {
        const getUser = await User.getUser(req.params.id)

        await getUser.destroy()

        return res.json({ message: 'User deleted!' })
    } catch (err) {
        return res.status(500).json({ error: 'Something went wrong' })

    }
}