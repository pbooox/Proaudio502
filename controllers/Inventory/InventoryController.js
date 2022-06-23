const Inventory = require('../../models/Inventory/Inventory');

exports.list =  async(req, res) => {
    let actualPage = parseInt(req.query.page);
    let perPage = parseInt(req.query.limit);
    let filter = req.query.criterio;
    let search = req.query.search;
    let order = req.query.order;
    // if(!order){
    //     filter='registro';
    //     order='asc';
    // }
    // order = (order =='asc'|| order == -1)? -1 : 1;
    // let columna=req.query.columna;

   
   
    const regex = new RegExp(search, 'i');
    console.log(regex)

    // result1 = await Inventory.find({name: regex}).populate('product');
    // console.log(result1)
    result= await  Inventory.paginate({'name': regex},{limit:perPage,page:actualPage,sort:{[filter]:[order]}
        ,populate:[
        {
            path: 'product',
            select: '_id name barCode',
            populate: [
                {
                    path: 'type',
                    select: '_id name'
                },
                {
                    path: 'brand',
                    select: '_id name'
                }
            ]
        },
        {
            path: 'store',
            select: '_id name'
        }
        // {
        //     path: 'brand',
        //     select: '_id name'
        // }
    ],
}
    );
    console.log(result)
       
    if (result.length === 0) {
        return res.send('No se encontraron inventarios');
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
    // console.log(req.body)
    let form = req.body.form;
    const inventory = new Inventory({
        price: form.price,
        minimalPrice: form.minimalPrice,
        purchasePrice: form.purchasePrice,
        stock: form.stock,
        store: form.store,
        product: form.product,
        employee: form.employee
    });

    inventory.save(function (err, inventory) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(inventory);
    });
}

exports.update = async (req, res) => {
    const body = req.body;
    // console.log(body)
    Inventory.updateOne({ _id: body.form.id }, {
        $set: {
            price: req.body.form.price,
            minimalPrice: req.body.form.minimalPrice,
            purchasePrice: req.body.form.purchasePrice,
            stock: req.body.form.stock,
            product: req.body.form.product,
            update: Date.now(),
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo actualizar el inventario',
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
    Inventory.updateOne({ _id: body.id }, {
        $set: {
            update: Date.now(),
            state: true
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo activar el inventario',
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
    Inventory.updateOne({ _id: body.id }, {
        $set: {
            update: Date.now(),
            state: false
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo desactivar el inventario',
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
