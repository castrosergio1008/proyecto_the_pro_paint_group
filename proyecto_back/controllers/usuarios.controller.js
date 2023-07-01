const Usuario = require("../models/usuarios.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");


exports.login = function(req, res, next) {
    let hashedpass = crypto.createHash("sha512").update(req.body.pass).digest("hex");
    Usuario.findOne({usuario: req.body.usuario, pass: hashedpass}).then(usuario => {
        let response = {
            token: null
        };


        if(usuario !== null) {
            let payload = {
                id: usuario._id,
                usuario: usuario.usuario
            }
            response.token = jwt.sign(payload, '__recret__',
            {expiresIn: '12h'})
        }
        res.json(response);
    })
}