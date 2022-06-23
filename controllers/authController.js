const User = require('../models/User');
const md5 = require('md5')
// const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { TokenExpiredError } = require('jsonwebtoken');

exports.login = async (req, res, next) => {
    // console.log('lo que llega', req.body)
    try {
        let user = await User.findOne({ user: req.body.user }).populate("employee");
        if( !user ) {
            console.log('no hay usuario')
            return res.status(400).json({ msg: 'El usuario no existe' });
        }
        //review password
        const pass = await md5(req.body.password);
        if (pass === user.password){
            // create payload
            const payload = {
                user: {
                    id: user.id
                }
            };
            // sign jwt
            jwt.sign(payload, process.env.VERIFICADOR, (error, token) => {
                if(error) throw error;
                // confirmation msg
                user.expires = Date.now() + 3600000;
                res.json({ msg: "Correcto", token, expires: user.expires, user: user});
            });

        } else {
            console.log('incorrecto')
            return res.status(400).json({ msg: 'La contraseña es incorrecta' })
        }
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: 'error: ' + error })
    }
}     

exports.logout = async (req, res, next) => {
    const authHeader = req.body.token;
        jwt.sign(authHeader, "", { expiresIn: 1 } , (logout, err) => {
            if (logout) {
               res.send({msg : 'Has sido desconectado' });
            } else {
               res.send({msg:'Error'});
            }
         });
}