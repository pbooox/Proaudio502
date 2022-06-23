const User = require('../../models/User');
const { validationResult } = require('express-validator');
const md5 = require('md5');

exports.list = async (req, res) => {
    let actualPage = parseInt(req.query.page);
    let perPage = parseInt(req.query.limit);
    let filter = req.query.criterio;
    let search = req.query.search;
    let order = req.query.order;
   
   
    const regex = new RegExp(search, 'i');
    // console.log(regex)
    result= await User.paginate({user:regex},{limit:perPage,page:actualPage,sort:{[filter]:[order]}, 
        populate:[
            {
                path: 'employee',
                select: '_id name secondName'
            }
        ]
    });
    // console.log(result)
       
    if (result.length === 0) {
        return res.send('No se encontraron tipos');
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
    //Revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    //extraer usr y password
    // const { user, password } = req.body;

    try {
        //Revisar que el usuario sea unico
        let usuario = await User.findOne({ user: req.body.form.user });

        if (usuario) {
            return res.status(400).json({ msg: 'El usuario ya fue registrado previamente' });
        }
        //crea nuevo usuario
        let form = req.body.form
        // console.log(form)

        const user = User({
            user: form.user,
            password: md5(form.password), 
            type: form.type,
            employee: form.employee,
            state: true
        });
        // usuario = new Usuarios(req.body);

        console.log(user)
        //hash password
        // const salt = await md5(password);
        // usuario.password = salt;

        //guarda nuevo usuario

        // await usuario.save();
        user.save(function (err, user) {
            if (err){
                console.log(err)
                // return res.send(500, err.message);
            }
            res.status(200).jsonp(user);
        });
        //Crear y firmar el JWT
        // const payload = {
        //     usuario: {
        //         id: usuario.id
        //     }
        // };

        // //Firmar el jwt
        // jwt.sign(payload, process.env.VERIFICADOR, {
        //     expiresIn: 3600
        // }, (error, token) => {
        //     if (error) throw error;

        //     //Mensaje de confirmacion
        //     res.json({ token });
        // });

        // res.send('Usuario guardado correctamente');
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}

exports.update = async (req, res) => {

    let form = req.body.form;
    console.log(form)
    try {
        User.updateOne({ _id: form.id }, {
            $set: {
                user: form.user,
                password: md5(form.password), 
                type: form.type,
                employee: form.employee,
                update: Date.now(),
            }
        },
            function (err, info) {
                if (err) {
                    res.json({
                        resultado: false,
                        msg: 'No se pudo actualizar el usuario',
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
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}

exports.activate = async (req, res) => {
    User.updateOne({ _id: req.body.id }, {
        $set: {
            update: Date.now(),
            state: true
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo activar el usuario',
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
    User.updateOne({ _id: req.body.id }, {
        $set: {
            update: Date.now(),
            state: false
        }
    },
        function (err, info) {
            if (err) {
                res.json({
                    resultado: false,
                    msg: 'No se pudo desactivar el usuario',
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