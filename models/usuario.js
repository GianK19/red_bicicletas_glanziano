var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var Reserva = require('./reserva');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const saltRounds = 10;

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

var usuarioSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'El email es obligatorio'],
        lowercase: true,
        unique: true,
        validate: [ validateEmail, 'Por favor, ingrese un email válido' ],
        match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ]
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']

    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.plugin(uniqueValidator, { message: 'El {PATH} ya existe en el sistema' });

usuarioSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
});

usuarioSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

usuarioSchema.methods.reservar = function (bicicleta, desde, hasta, callback) {
    var reserva = new Reserva({
        usuario: this._id,
        bicicleta: bicicleta,
        desde: desde,
        hasta: hasta
    });
    console.log(reserva);
    reserva.save(callback);
}

module.exports = mongoose.model('Usuario', usuarioSchema);