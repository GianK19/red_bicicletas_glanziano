var mongoose = require("mongoose");
var Bicicleta = require("../../models/bicicleta");
var Usuario = require("../../models/usuario");
var Reserva = require("../../models/reserva");

describe("Testing Usuarios", function () {
    beforeEach(function (done) {
        if (mongoose.connection.readyState === 0) {
            var mongoDB = "mongodb://localhost/testdb";
            mongoose.connect(mongoDB, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            db = mongoose.connection;
            db.on("error", console.error.bind(console, "connection error"));
            db.once("open", function () {
                console.log("We are connected to test database");
                done();
            });
        } else {
            Promise.all([
                Reserva.deleteMany({}),
                Usuario.deleteMany({}),
                Bicicleta.deleteMany({})
            ]).then(() => done());
        }
    });

    afterAll(function (done) {
        mongoose.connection.close().then(() => done());
    });

    describe("Cuando un Usuario reserva una bici", () => {
        it("debe existir la reserva", function(done) {
            const usuario = new Usuario({ nombre: "Ezequiel" });
            const bicicleta = new Bicicleta({
                code: 1,
                color: "verde",
                modelo: "urbana",
            });

            Promise.all([usuario.save(), bicicleta.save()]).then(() => {
                var hoy = new Date();
                var mañana = new Date();
                mañana.setDate(hoy.getDate() + 1);

                usuario.reservar(bicicleta._id, hoy, mañana, function (err, reserva) {
                    Reserva.find({usuario: usuario._id}).populate({path: 'bicicleta', model: 'Bicicleta'}).populate({path: 'usuario', model: 'Usuario'}).exec(function (err, reservas) {
                        console.log(reservas[0]);
                        expect(reservas.length).toBe(1);
                        expect(reservas[0].diasDeReserva()).toBe(2);
                        expect(reservas[0].bicicleta.code).toBe(1);
                        expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
                        done();
                    });
                });
            });
        });
    });
});
