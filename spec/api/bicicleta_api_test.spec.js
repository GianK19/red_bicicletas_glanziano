const request = require('request');
var Bicicleta = require('../../models/bicicleta');
var server = require('../../bin/www');

describe('Bicicleta API', () => {

    beforeEach(() => {
        Bicicleta.allBicis = [];
    });

    describe('GET BICICLETAS /', () => {
         it('STATUS 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0);
            var a = new Bicicleta(1, 'rojo', 'urbana', [4.710703, -74.1145326]);
            Bicicleta.add(a);
            request.get({'url': 'http://localhost:3000/api/bicicletas'},
            function(error, response, body) {
                expect(response.statusCode).toBe(200);
            });
        });
    });

    describe('POST BICICLETAS /create', () => {
        it('STATUS 200', (done) => {
            var headers = { 'content-type': 'application/json' };
            var aBici = '{ "id": 10, "color": "rojo", "modelo": "urbana", "lat": 4.710703, "lng": -74.1145326 }';

            request.post({
                headers: headers,
                url: 'http://localhost:3000/api/bicicletas/create',
                body: aBici
            }, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(10).color).toBe("rojo");
                done();
            });
        });
    });

    describe('PUT BICICLETAS /update/:id', () => {
        it('STATUS 200', (done) => {
            var headers = { 'content-type': 'application/json' };
            var bici = new Bicicleta(20, 'azul', 'urbana', [4.710703, -74.1145326]);
            Bicicleta.add(bici);
            var updated = '{ "id": 20, "color": "verde", "modelo": "montaña", "lat": 5.000000, "lng": -75.000000 }';

            request.put({
                headers: headers,
                url: 'http://localhost:3000/api/bicicletas/update/20',
                body: updated
            }, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                var biciActualizada = Bicicleta.findById(20);
                expect(biciActualizada.color).toBe('verde');
                expect(biciActualizada.modelo).toBe('montaña');
                done();
            });
        });
    });

    describe('DELETE BICICLETAS /delete', () => {
        it('STATUS 204', (done) => {
            var headers = { 'content-type': 'application/json' };
            var bici = new Bicicleta(30, 'negro', 'urbana', [4.710703, -74.1145326]);
            Bicicleta.add(bici);
            var body = '{ "id": 30 }';

            request.delete({
                headers: headers,
                url: 'http://localhost:3000/api/bicicletas/delete',
                body: body
            }, function (error, response, body) {
                expect(response.statusCode).toBe(204);
                expect(Bicicleta.allBicis.length).toBe(0);
                done();
            });
        });
    });

    
});