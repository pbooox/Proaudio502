const Product = require('../../models/Products/Product');

exports.create = async (req, res) => {
    const product = new Product({
        name: req.body.nombre,
        codeBar: req.body.codigo_barras,
        description: req.body.descripcion,
        photo: req.body.fotografia,
        type: req.body.color,
        brand: req.body.tipo_producto,
    });

    product.save(function (err, product) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(product);
    });
}