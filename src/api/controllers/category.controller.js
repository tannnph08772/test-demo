const Category = require('../models/category.model');
const Product = require('../models/product.model');

exports.show = async(req, res, next) => {
    await Category.getAllCategory()
        .then(cate => {
            res.json(cate);
        })
        .catch(next);
}

exports.create = async(req, res, next) => {
    Category.Category.update({
        cateName: req.body.cateName,
    }, { where: { id: 1 } })
    await Category.Category.afterUpdate(async(cate, options) => {
        console.log(cate)
    });
}

exports.edit = async(req, res, next) => {
    await Category.findOne({ where: { id: req.params.id } })
        .then(category => { return res.json({ category }) })
        .catch(next)
}

exports.update = async(req, res, next) => {
    const { cateName } = req.body;
    await Category.update({ cateName: cateName }, { where: { id: req.params.id } })
        .then(() => {
            res.send("Data was Updated");
        })
        .catch((err) => {
            console.log("Error : ", err)
        });
}

exports.deleted = async(req, res, next) => {
    try {
        const Category = await Category.findOne({ where: { id: req.params.id } })

        await Category.destroy()

        return res.json({ message: 'Category deleted!' })
    } catch (err) {
        return res.status(500).json({ error: 'Something went wrong' })
    }
}