var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

var reservaSchema = new Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    bicicleta: { type: mongoose.Schema.Types.ObjectId, ref: 'Bicicleta' },
    desde: Date,
    hasta: Date
});

reservaSchema.methods.diasDeReserva = function () {
    return moment(this.hasta).diff(moment(this.desde), 'days') + 1;
}

module.exports = mongoose.model('Reserva', reservaSchema);