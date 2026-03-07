var mongoose = require('mongoose');
const request = require('request');
var Bicicleta = require('../../models/bicicleta');
var server = require('../../bin/www');

var base_url = 'http://localhost:3000/api/bicicletas';

describe('Bicicleta API', () => {

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

    describe('GET BICICLETAS /', () => {
         it('Status 200', function(done) {
            request.get(base_url, function(error, response, body) {
                var result = JSON.parse(body);
                expect(response.statusCode).toBe(200);
                expect(result.bicicletas.length).toBe(0);
                done();
            });
        });
    });

    describe('POST BICICLETAS /create', () => {
        it('Status 200', function(done) {
            var headers = { 'content-type': 'application/json' };
            var aBici = '{ "id": 10, "color": "rojo", "modelo": "urbana", "lat": 4.710703, "lng": -74.1145326 }';
            request.post({
                headers: headers,
                url: base_url + '/create',
                body: aBici
            }, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                var bici = JSON.parse(body).bicicleta;
                console.log(bici);
                expect(bici.color).toBe("rojo");
                expect(bici.ubicacion[0]).toBe(4.710703);
                expect(bici.ubicacion[1]).toBe(-74.1145326);
                done();
            });
        });
    });

    describe('PUT BICICLETAS /update/:id', () => {
        it('Status 200', function(done) {
            var headers = { 'content-type': 'application/json' };
            var bici = new Bicicleta({
                code: 20,
                color: 'azul',
                modelo: 'urbana',
                ubicacion: [4.710703, -74.1145326]
            });

            bici.save().then(() => {

                var updated = JSON.stringify({
                    id: 20,
                    color: "verde",
                    modelo: "montaña",
                    lat: 5.000000,
                    lng: -75.000000
                });

                request.put({
                    headers: headers,
                    url: base_url + '/update/20',
                    body: updated
                }, function (error, response, body) {

                    expect(response.statusCode).toBe(200);

                    Bicicleta.findOne({ code: 20 }).then((biciActualizada) => {
                        expect(biciActualizada.color).toBe('verde');
                        expect(biciActualizada.modelo).toBe('montaña');
                        done();
                    });

                });

            });

        });
    });

    describe('DELETE BICICLETAS /delete', () => {
        it('Status 204', function(done) {
            var headers = { 'content-type': 'application/json' };
            var bici = new Bicicleta({
                code: 30,
                color: 'negro',
                modelo: 'urbana',
                ubicacion: [4.710703, -74.1145326]
            });

            bici.save().then(() => {

                var body = JSON.stringify({ id: 30 });

                request.delete({
                    headers: headers,
                    url: base_url + '/delete',
                    body: body
                }, function (error, response, body) {

                    expect(response.statusCode).toBe(204);

                    Bicicleta.findOne({ code: 30 }).then((bici) => {
                        expect(bici).toBe(null);
                        done();
                    });

                });

            });

        });
    });

    
});