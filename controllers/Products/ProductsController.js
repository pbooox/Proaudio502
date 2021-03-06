const req = require('express/lib/request');
const res = require('express/lib/response');
const Product = require('../../models/Products/Product');
// const escapeStringRegexp = require('escape-string-regexp');

exports.list =  async(req, res) => {
    let actualPage = parseInt(req.query.page);
    let perPage = parseInt(req.query.limit);
    let filter = req.query.criterio;
    let search = req.query.search;
    let order = req.query.order;
    let columna = req.query.columna;

    // console.log(columna)
    // if(!order){
    //     filter='registro';
    //     order='asc';
    // }
    // order = (order =='asc'|| order == -1)? -1 : 1;
    // let columna=req.query.columna;

   
   
    const regex = new RegExp(search, 'i');
    // console.log('//////////////////////////////////////////////////////////')
    // console.log(regex)
    // result= await  Product.paginate({[columna]:regex},{limit:perPage,page:actualPage,sort:{[filter]:[order]},populate:[
    result= await  Product.paginate({limit:perPage,page:actualPage,sort:{[filter]:[order]},populate:[
        {
            path: 'type',
            select: '_id name',
            match: { name: regex}
        },
        {
            path: 'brand',
            select: '_id name'
        }
    ]});
    // console.log(result)
    
    // console.log(result)
       
    if (result.length === 0) {
        return res.send('No se encontraron productos');
    }
    else {
        let pagination = {
            data: result.docs,
            current_page: result.page,
            last_page: result.totalPages,
            from: 1,
            per_page: result.limit,
            status: true,
            to: result.limit,
            total: result.totalDocs,
        }
        res.send(pagination);
    }
}



exports.create = async (req, res) => {
    console.log(req.body)
    let form = req.body.form
    const product = new Product({
        name: form.name,
        barCode: form.barCode,
        description: form.description,
        purchasePrice: form.purchasePrice,
        seller: form.seller,
        installation: form.installation,
        storePrice: form.storePrice,
        distPrice: form.distPrice,
        // photo: req.body.fotografia,
        type: req.body.form.type,
        brand: req.body.form.brand,
    });

    product.save(function (err, product) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(product);
    });
}

exports.update = async (req, res) => {
    const body = req.body;
    // console.log(body)
    Product.updateOne({ _id: body.form.id }, {
        $set: {
            name: req.body.form.name,
            barCode: req.body.form.barCode,
            description: req.body.form.description,
            // photo: req.body.fotografia,
            type: req.body.form.type,
            brand: req.body.form.brand,
            update: Date.now(),
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo actualizar el producto',
                    err
                });
            }
            else {
                res.json({
                    resultado: true,
                    info: info
                })
            }
        }
    )
}

exports.activate = async (req, res) => {
    const body = req.body;
    Product.updateOne({ _id: body.id }, {
        $set: {
            update: Date.now(),
            state: true
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo activar el producto',
                    err
                });
            }
            else {
                res.json({
                    resultado: true,
                    info: info
                })
            }
        }
    )
}
exports.deactivate = async (req, res) => {
    const body = req.body;
    Product.updateOne({ _id: body.id }, {
        $set: {
            update: Date.now(),
            state: false
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo desactivar el producto',
                    err
                });
            }
            else {
                res.json({
                    resultado: true,
                    info: info
                })
            }
        }
    )
}

exports.searchSelect = async (req, res) => {
    const products = await Product.find({name: {$regex:req.query.search}})
    .populate("type").populate("brand");
    // console.log(products)
    if (products.length === 0) {
        return res.send('No se encontraron productos');
    }
    else {
        res.send(products);
    }
}