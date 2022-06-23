const { lookup } = require('shortid/lib/alphabet');
const Employees = require('../../models/Employees/Employees');

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
    // console.log(regex)
    result= await Employees.paginate({name:regex},{limit:perPage,page:actualPage,sort:{[filter]:[order]}});
    // console.log(result)
       
    if (result.length === 0) {
        return res.send('No se encontraron tipos de producto');
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
    // console.log('AQUI ESTOY')
    // console.log(req.body);      
    const employee = new Employees({
        name: req.body.form.name,
        secondName: req.body.form.secondName,
        phoneNumber: req.body.form.phoneNumber,
        mail: req.body.form.mail,
        cui: req.body.form.cui,
        state: true
    });

    employee.save(function (err, employee) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(employee);
    });
}

exports.update = async (req, res) => {
    const body = req.body;
    Employees.updateOne({ _id: body.form.id }, {
        $set: {
            name: req.body.form.name,
            secondName: req.body.form.secondName,
            phoneNumber: req.body.form.phoneNumber,
            mail: req.body.form.mail,
            cui: req.body.form.cui,
            update: Date.now(),
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo actualizar el empleado',
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
    Employees.updateOne({ _id: body.id }, {
        $set: {
            update: Date.now(),
            state: true
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo activar el tipo de producto',
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
    Employees.updateOne({ _id: body.id }, {
        $set: {
            update: Date.now(),
            state: false
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo desactivar el tipo de producto',
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

exports.getEmployees = async (req, res) => {
    const employees = await Employees.find();

    if (employees.length === 0) {
        return res.send('No se encontraron empleados');
    }
    else {
        res.send(employees);
    }

    // const employees = await Employees.aggregate().lookup({
    //         from: 'users',
    //         localField: '_id',
    //         foreignField: 'employee',
    //         as: 'employees' 
        
    // });
    
    // console.log(employees)
    // console.log('////////')
    // res.send(employees)
}