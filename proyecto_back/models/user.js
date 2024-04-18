import mongoose, {Schema} from "mongoose";
import bcrypt from 'bcrytpjs';

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true
    },
    pass:{
        type: String,
        require: true
    },
    role:[{
        ref:'Role',
        type: Schema.Types.ObjectId
    }]
},{
    timestamps: true,
    versionKey: false
})

//metodo que encripta la contraseña deñ usuario
usersSchema.statics.encriptarPass = async (pass) =>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pass, salt);
}

//método que compara las contraseñas del usuario.
usersSchema.statics.compararPass = async (pass, passReceived) => {
    return await bcrypt.compare(pass, passReceived);
}

export default mongoose.model('User', userSchema); 