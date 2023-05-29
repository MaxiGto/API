import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    }
}, 
{ 
    versionKey: false 
});

UserSchema.methods.toJSON = function() {

    const { __v, _id, password, ...usuario } = this.toObject();

    usuario.id = _id;

    return usuario;

}


export default mongoose.model('User', UserSchema);