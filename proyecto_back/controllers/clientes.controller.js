const Cliente = require("../models/clientes.model");
const now = new Date();

//formato de la respuesta
let response = {
    msg: "",
    exito: false,
    hora : now
}

//funcion para crear un empleado nuevo
exports.create = function(req,res){
    let cliente = new Cliente({
        nombre: req.body.nombre,
        apellido_p: req.body.apellido_p,
        apellido_m: req.body.apellido_m,
        telefono: req.body.telefono,
        mail: req.body.mail,
        direccion: req.body.direccion
    })

    //guarda el empleado nuevo
    cliente.save().then(() => {
        response.exito = true,
        response.msg= "El cliente se guardó correctamente"
        console.log('cliente guardado exitosamente');
        res.json(response)
        }).catch((error) => {
            console.error('Error al guardar el cliente', error);
        });
}

//funcion para mostrar todos los datos de los empleados
exports.find = function (req, res){
    Cliente.find()
    .then(clientes =>
        res.json(clientes))
}

//funcion para mostrar el dato de un empleado dado su id.
exports.findById = function(req, res){
    Cliente.findById(req.params.id)
    .then(clientes =>
        res.json(clientes))
}

//funcion para actualizar los datos de un empleado dado su id.
exports.update = function(req, res){
    let cliente = {
        nombre: req.body.nombre,
        apellido_p: req.body.apellido_p,
        apellido_m: req.body.apellido_m,
        telefono: req.body.telefono,
        mail: req.body.mail,
        direccion: req.body.direccion
    }
//actualiza un contacto usando el id_
    Clientes.findByIdAndUpdate(req.params.id, {$set: cliente})
        .then(
        response.exito = true,
        response.msg= "El cliente se actualizó correctamente",
        res.json(response))
        .catch( error => {
            response.exito = false,
            response.msg = "Error al actualizar el cliente",
            res.json(response)})
}

exports.remove = function(req, res){
    Cliente.findByIdAndRemove(req.params.id)
        .then(
        response.exito = true,
        response.msg= "El cliente se eliminó correctamente",
        res.json(response))
        .catch(
            error => {
            response.exito = false,
            response.msg = "Error al eliminar el cliente",
            res.json(response)})
}