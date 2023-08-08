const Material = require("../models/materiales.model");
const now = new Date();

//formato de la respuesta
let response = {
    msg: "",
    exito: false,
    hora : now
}

//funcion para crear un material nuevo
exports.create = function(req,res){
    let material = new Material({
        nombre: req.body.nombre,
        brillo: req.body.brillo,
        superficie: req.body.superficie,
        precio_galon: req.body.precio_galon,
        cubrimiento: req.body.cubrimiento
    })

    //guarda el material nuevo
    material.save().then(() => {
        response.exito = true,
        response.msg= "El material se guardó correctamente"
        console.log('material guardado exitosamente');
        res.json(response)
        }).catch((error) => {
            console.error('Error al guardar el material', error);
        });
}

//funcion para mostrar todos los datos de los materiales
exports.find = function (req, res){
    Material.find()
    .then(materiales =>
        res.json(materiales))
}

//funcion para mostrar el dato de un material dado su id.
exports.findById = function(req, res){
    Material.findById(req.params.id)
    .then(materiales =>
        res.json(materiales))
}

//funcion para actualizar los datos de un material dado su id.
exports.update = function(req, res){
    let material = {
        nombre: req.body.nombre,
        brillo: req.body.brillo,
        superficie: req.body.superficie,
        precio_galon: req.body.precio_galon,
        cubrimiento: req.body.cubrimiento
    }
//actualiza un material usando el id_
    Material.findByIdAndUpdate(req.params.id, {$set: material})
        .then(
        response.exito = true,
        response.msg= "El material se actualizó correctamente",
        res.json(response))
        .catch( error => {
            response.exito = false,
            response.msg = "Error al actualizar el material",
            res.json(response)})
}

exports.remove = function(req, res){
    Material.findByIdAndRemove(req.params.id)
        .then(
        response.exito = true,
        response.msg= "El material se eliminó correctamente",
        res.json(response))
        .catch(
            error => {
            response.exito = false,
            response.msg = "Error al eliminar el material",
            res.json(response)})
}