var mongoose = require('mongoose');
var Reserva = require('./reserva');
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nombre: String,
});

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