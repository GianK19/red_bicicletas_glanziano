var Usuario = require('../models/usuario');
var Token = require('../models/token');
const { type } = require('express/lib/response');

module.exports = {
    confirmationGet: function (req, res, next) {
        Token.findOne({ token: req.params.token }, function (err, token) {
            console.log(req.params.token);
            if (!token) return res.status(400).json({ type: 'not-verified', msg: 'No encontramos un usuario con este token. Quiza haya expirado y debas solicitar uno nuevo.' });
            Usuario.findById(token.userId, function (err, usuario) {
                if (!usuario) return res.status(400).json({ msg: 'No encontramos un usuario para este token.' });
                if (usuario.verificado) return res.redirect('/usuarios');
                usuario.verificado = true;
                usuario.save(function (err) {
                    if (err) { return res.status(500).json({ msg: err.message }); }
                    res.redirect('/');
                });
            });
        });
    }
};