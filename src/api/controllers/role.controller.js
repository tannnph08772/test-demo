const Role = require('../models/role.model');

exports.show = async(req, res, next) => {
    await Role.findAll()
        .then(role => {
            res.json(role);
        })
        .catch(next);
}

exports.create = async(req, res, next) => {
    Role.create({
            roleName: req.body.roleName,
        })
        .then(role => { res.json(role) })
        .catch(next);
}

exports.edit = async(req, res, next) => {
    await Role.findOne({ where: { id: req.params.id } })
        .then(role => { return res.json({ role }) })
        .catch(next)
}

exports.update = async(req, res, next) => {
    const { roleName } = req.body;
    await Role.update({ roleName: roleName }, { where: { id: req.params.id } })
        .then(() => {
            res.send("Data was Updated");
        })
        .catch((err) => {
            console.log("Error : ", err)
        });
}

exports.deleted = async(req, res, next) => {
    try {
        const role = await Role.findOne({ where: { id: req.params.id } })

        await role.destroy()

        return res.json({ message: 'role deleted!' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })

    }
}