var Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = function (req, res) {
    Bicicleta.find({}, function(err, bicis) {
        res.status(200).json({
            bicicletas: bicis
        });
    });
}

exports.bicicleta_create = function (req, res) {
    var bici = new Bicicleta({
        code: req.body.id,
        color: req.body.color,
        modelo: req.body.modelo,
        ubicacion: [req.body.lat, req.body.lng]
    });
    bici.save(function(err, biciGuardada) {
        res.status(200).json({
            bicicleta: biciGuardada
        });
    });
}

exports.bicicleta_update = function (req, res) {
    Bicicleta.findOne({ code: req.params.id }, function(err, bici) {
        if (!bici) {
            res.status(404).json({ error: 'Bicicleta not found' });
        } else {
            bici.code = req.body.id;
            bici.color = req.body.color;
            bici.modelo = req.body.modelo;
            bici.ubicacion = [req.body.lat, req.body.lng];
            bici.save(function(err, biciActualizada) {
                res.status(200).json({
                    bicicleta: biciActualizada
                });
            });
        }
    });
}

exports.bicicleta_delete = function (req, res) {
    Bicicleta.deleteOne({ code: req.body.id }, function(err) {
        res.status(204).send();
    });
}