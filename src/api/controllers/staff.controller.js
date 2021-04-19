const jwt = require('jsonwebtoken');
const Staff = require('../models/staff.model');
const Role = require('../models/role.model');
const bcrypt = require('bcrypt');

const show = async(req, res, next) => {
    const allStaff = await Staff.getAllStaff();
    res.json(allStaff)
}

const create = async(req, res, next) => {
    const role = Role.findOne({ where: { id: req.body.id } });
    const password = await bcrypt.hash(req.body.password, 10);
    Staff.create({
            name: req.body.name,
            email: req.body.email,
            password: password,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            idRole: role.id
        })
        .then(staff => { res.json(staff) })
        .catch(next);
}

const edit = async(req, res, next) => {
    await Staff.findOne({ where: { id: req.params.id } })
        .then(staff => { return res.json({ staff }) })
        .catch(next)
}

const update = async(req, res, next) => {
    const role = Role.findOne({ where: { id: req.params.id } });
    const { name, phoneNumber, email, address } = req.body;
    const password = await bcrypt.hash(req.body.password, 10)
    Staff.update({ name: name, email: email, phoneNumber: phoneNumber, address: address, idRole: role.id, password: password }, { where: { id: req.params.id } })
        .then(() => {
            res.send("Data was Updated");
        })
        .catch((err) => {
            console.log("Error : ", err)
        });
}

const deleted = async(req, res, next) => {
    try {
        const Staff = await Staff.findOne({ where: { id: req.params.id } })

        await Staff.destroy()

        return res.json({ message: 'Staff deleted!' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })

    }
}

const loginStaff = async(req, res, next) => {
    const password = req.body.password;
    await Staff.findOne({ where: { email: req.body.email } })
        .then(staff => {
            if (staff) {
                bcrypt.compare(password, staff.password, function(err, result) {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }
                    if (result) {
                        let token = jwt.sign({ name: staff.name }, 'AzQ,PI)0(', { expiresIn: "1h" });
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
                    massage: 'Not Staff found'
                })
            }
        })
}

module.exports = { show, create, edit, update, deleted, loginStaff };