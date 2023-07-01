const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MaterialesSchema = new Schema({
    nombre:{type: String, required: true, max:60},
    brillo:{type: String, required: true, max:40},
    superficie:{type: String, required: true, max:40},
    precio_galon: {type: String, required: true, max:15},
    cubrimiento: {type: String, required: false, max:70}
});

module.exports = mongoose.model("materiales", MaterialesSchema);