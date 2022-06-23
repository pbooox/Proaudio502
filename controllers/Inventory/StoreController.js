const Store = require('../../models/Inventory/Store');

exports.list = async (req, res) =>{
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
    // console.log(regex)
    result= await Store.paginate({name:regex},{limit:perPage,page:actualPage,sort:{[filter]:[order]}});
    // console.log(result)
       
    if (result.length === 0) {
        return res.send('No se encontraron tiendas');
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

exports.create =  async (req, res) => {
    let form = req.body.form;
    const store = new Store({
        name: form.name,
        location: form.location,
        address: form.address,
        state: true
    });

    store.save(function (err, store) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(store);
    });
}

exports.update = async (req, res) => {
    const form = req.body.form;
    // console.log(body)
    Store.updateOne({ _id: form.id }, {
        $set: {
            name: form.name,
            location: form.location,
            address: form.address,
            update: Date.now(),
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo actualizar la tienda',
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
    Store.updateOne({ _id: body.id }, {
        $set: {
            update: Date.now(),
            state: true
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo activar la marca',
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
    Store.updateOne({ _id: body.id }, {
        $set: {
            update: Date.now(),
            state: false
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo desactivar la marca',
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

exports.get = async (req, res) => {
    const stores = await Store.find();

    if (stores.length === 0) {
        return res.send('No se encontraron tiendas');
    }
    else {
        res.send(stores);
    }
}