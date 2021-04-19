const { response } = require('express');
const Product = require('../models/product.model');
const path = require('path');

exports.show = async(req, res, next) => {
    const allProduct = await Product.getAllProduct();
    res.json(allProduct);
}

exports.create = async(req, res, next) => {
    console.log(req.user)
        // const Cate = findOne({ where: { id: req.body.id } })
        // if (req.files) {
        //     let path = ''
        //     req.files.forEach(function(files, index, arr) {
        //         path = path + files.path + ','
        //     });
        //     path = path.substring(0, path.lastIndexOf(","))
        //     Product.image = path
        // }
    console.log(Product.image)
    await Product.create({
            productName: req.body.productName,
            productDetail: req.body.productDetail,
            image: req.body.image,
            quantity: req.body.quantity,
            price: req.body.price,
            priceSale: req.body.priceSale,
            status: req.body.status,
            cateId: req.body.cateId
        })
        .then(product => { res.json(product) })
        .catch(next);
}

exports.edit = async(req, res, next) => {
    await Product.findOne({ where: { id: req.params.id } })
        .then(product => { return res.json({ product }) })
        .catch(next)
}

exports.update = async(req, res, next) => {
    const { productName, productDetail, image, price, priceSale, quantity, cateId } = req.body;
    Product.update({
            productName: productName,
            image: image,
            productDetail: productDetail,
            cateId: cateId,
            quantity: quantity,
            price: price
        }, { where: { id: req.params.id } })
        .then(() => {
            res.send("Data was Updated");
        })
        .catch((err) => {
            console.log("Error : ", err)
        });
}

exports.deleted = async(req, res, next) => {
    try {
        const product = await Product.findOne({ where: { id: req.params.id } })

        await product.destroy()

        return res.json({ message: 'product deleted!' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Something went wrong' })

    }
}