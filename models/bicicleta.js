var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bicicletaSchema = new Schema({
    code: Number,
    color: String,
    modelo: String,
    ubicacion: {
        type: [Number], index: { type: '2dsphere', sparse: true }
    }
});

bicicletaSchema.statics.createInstance = function (code, color, modelo, ubicacion) {
    return new this({
        code: code,
        color: color,
        modelo: modelo,
        ubicacion: ubicacion
    });
}

bicicletaSchema.methods.toString = function () {
    return 'code: ' + this.code + ' | color: ' + this.color;
}

bicicletaSchema.statics.allBicis = function (callback) {
    return this.find({}, callback);
}

bicicletaSchema.statics.add = function (aBici, callback) {
    return this.create(aBici, callback);
}

bicicletaSchema.statics.findById = function (aCode, callback) {
    return this.findOne({ code: aCode }, callback);
}

bicicletaSchema.statics.removeById = function (aCode, callback) {
    return this.deleteOne({ code: aCode }, callback);
}


module.exports = mongoose.model('Bicicleta', bicicletaSchema);
