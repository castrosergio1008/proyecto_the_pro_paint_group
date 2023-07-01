const Empleado = require("../models/empleados.model");
const now = new Date();

//formato de la respuesta
let response = {
    msg: "",
    exito: false,
    hora : now
}

//funcion para crear un empleado nuevo
exports.create = function(req,res){
    let empleado = new Empleado({
        nombre: req.body.nombre,
        apellido_p: req.body.apellido_p,
        apellido_m: req.body.apellido_m,
        telefono: req.body.telefono,
        mail: req.body.mail,
        direccion: req.body.direccion
    })

    //guarda el empleado nuevo
    empleado.save().then(() => {
        response.exito = true,
        response.msg= "El empleado se guardó correctamente"
        console.log('Empleado guardado exitosamente');
        res.json(response)
        }).catch((error) => {
            console.error('Error al guardar el empleado', error);
        });
}

//funcion para mostrar todos los datos de los empleados
exports.find = function (req, res){
    Empleado.find()
    .then(empleados =>
        res.json(empleados))
}

//funcion para mostrar el dato de un empleado dado su id.
exports.findById = function(req, res){
    Empleado.findById(req.params.id)
    .then(empleados =>
        res.json(empleados))
}

//funcion para actualizar los datos de un empleado dado su id.
exports.update = function(req, res){
    let empleado = {
        nombre: req.body.nombre,
        apellido_p: req.body.apellido_p,
        apellido_m: req.body.apellido_m,
        telefono: req.body.telefono,
        mail: req.body.mail,
        direccion: req.body.direccion
    }
//actualiza un contacto usando el id_
    Empleado.findByIdAndUpdate(req.params.id, {$set: empleado})
        .then(
        response.exito = true,
        response.msg= "El empleado se actualizó correctamente",
        res.json(response))
        .catch( error => {
            response.exito = false,
            response.msg = "Error al actualizar el empleado",
            res.json(response)})
}

exports.remove = function(req, res){
    Empleado.findByIdAndRemove(req.params.id)
        .then(
        response.exito = true,
        response.msg= "El empleado se eliminó correctamente",
        res.json(response))
        .catch(
            error => {
            response.exito = false,
            response.msg = "Error al eliminar el empleado",
            res.json(response)})
}
