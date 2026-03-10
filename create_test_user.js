const mongoose = require('mongoose');
const Usuario = require('./models/usuario');
const Token = require('./models/token');

mongoose.connect('mongodb://localhost/red_bicicletas', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
    console.log('Connected to database');

    // Crear usuario
    const usuario = new Usuario({
        nombre: 'Test User',
        email: 'test@example.com',
        password: 'password123'
    });

    usuario.save().then((nuevoUsuario) => {
        console.log('Usuario creado:', nuevoUsuario);

        // Crear token
        const token = new Token({
            userId: nuevoUsuario._id,
            token: 'testtoken123'
        });

        token.save().then((nuevoToken) => {
            console.log('Token creado:', nuevoToken);
            console.log('URL de verificación: http://localhost:3001/token/confirmation/testtoken123');
            process.exit();
        });
    });
});