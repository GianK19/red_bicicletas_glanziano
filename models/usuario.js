var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var Reserva = require('./reserva');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const saltRounds = 10;
const crypto = require('crypto');
const Token = require('../models/token');
const mailer = require('../mailer/mailer');

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

usuarioSchema.methods.enviar_email_bienvenida = function (cb) {
    const token = new Token({ userId: this._id, token: crypto.randomBytes(16).toString('hex') });
    const email_destination = this.email;

    token.save(function (err) {
        if (err) {
            console.log(err.message);
        }

        const mailOptions = {
            from: 'demosendgrid123@gmail.com',
            to: email_destination,
            subject: 'Verificación de Cuenta',
            text: 'Hola,\n\n' + 'Por favor, para verificar su cuenta haga click en este link:\n\n' +
                  'http://localhost:3000' + '\/token/confirmation\/' + token.token + '.\n',
            html: 'Hola,<br><br>' + 'Por favor, para verificar su cuenta haga click en este link:<br><br>' +
                  '<a href="' + 'http://localhost:3000' + '\/token/confirmation\/' + token.token + 
                  '" target="_blank">Activar Usuario</a>.<br>'
        };

        mailer.sendMail(mailOptions, function (err) {
            if (err) {
                console.log(err.message);
            }

            console.log('Se ha enviado un email de verificación a ' + email_destination + '.');
        });
    });
}


module.exports = mongoose.model('Usuario', usuarioSchema);