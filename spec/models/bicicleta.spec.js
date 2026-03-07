var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');

describe('Testing Bicicletas', function(){

    beforeEach(function(done) {
        if (mongoose.connection.readyState === 0) {
            var mongoDB = 'mongodb://localhost/testdb';
            mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

            const db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error'));
            db.once('open', function() {
                console.log('We are connected to test database!');
                done();
            });
        } else {
            Bicicleta.deleteMany({}).then(() => done());
        }
    });

    afterAll(function(done) {
        mongoose.connection.close().then(() => done());
    });

    describe('Bicicleta.createInstance', () => {
        it('crea una instancia de Bicicleta', () => {
            var bici = Bicicleta.createInstance(1, 'rojo', 'urbana', [4.710703, -74.1145326]);
            expect(bici.code).toBe(1);
            expect(bici.color).toBe('rojo');
            expect(bici.modelo).toBe('urbana');
            expect(bici.ubicacion[0]).toBe(4.710703);
            expect(bici.ubicacion[1]).toBe(-74.1145326);
        });
    });

    describe('Bicicleta.allBicis', () => {
        it('comienza vacía', (done) => {
            Bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toBe(0);
                done();
            });
        });
    });

    describe('Bicicleta.add', () => {
        it('agrega solo una bicicleta', (done) => {
            var bici = new Bicicleta({code: 1, color: 'rojo', modelo: 'urbana'});
            Bicicleta.add(bici, function(err, newBici){
                if (err) console.log(err);
                Bicicleta.allBicis(function(err, bicis){
                    expect(bicis.length).toBe(1);
                    expect(bicis[0].code).toBe(bici.code);
                    done();
                });
            });
        });
    });

    describe('Bicicleta.findById', () => {
        it('debe devolver la bicicleta con code 1', (done) => {
            Bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toBe(0);
                
                var bici = new Bicicleta({code: 1, color: 'rojo', modelo: 'urbana'});
                Bicicleta.add(bici, function(err, newBici){
                    if (err) console.log(err);

                    var bici2 = new Bicicleta({code: 2, color: 'blanco', modelo: 'montaña'});
                    Bicicleta.add(bici2, function(err, newBici){
                        if (err) console.log(err);
                        Bicicleta.findById(1, function(err, targetBici){
                            expect(targetBici.code).toBe(bici.code);
                            expect(targetBici.color).toBe(bici.color);
                            expect(targetBici.modelo).toBe(bici.modelo);
                            done();
                        });
                    });
                });
            });
        });
    });

    describe('Bicicleta.removeById', () => {
        it('debe eliminar la bicicleta con code 1', (done) => {
            var bici = new Bicicleta({code: 1, color: 'rojo', modelo: 'urbana'});
            Bicicleta.add(bici, function(err, newBici){
                if (err) console.log(err);
                Bicicleta.removeById(1, function(err, response){
                    if (err) console.log(err);
                    Bicicleta.allBicis(function(err, bicis){
                        expect(bicis.length).toBe(0);
                        done();
                    });
                });
            });
        });
    });
});
