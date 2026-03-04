var Bicicleta = require('../../models/bicicleta');

describe('Bicicleta', () => {

    beforeEach(() => {
        Bicicleta.allBicis = [];
    });
    
    describe('Bicicleta.allBicis', () => {
        it('comienza vacía', () => {
            expect(Bicicleta.allBicis.length).toBe(0);
        });
    });

    describe('Bicicleta.add', () => {
        it('agrega una bicicleta', () => {
            expect(Bicicleta.allBicis.length).toBe(0);
            var a = new Bicicleta(1, 'rojo', 'urbana', [4.710703, -74.1145326]);
            Bicicleta.add(a);
            expect(Bicicleta.allBicis.length).toBe(1);
            expect(Bicicleta.allBicis[0]).toBe(a);
        });
    });

    describe('Bicicleta.findById', () => {
        it('debe devolver la bicicleta con id 1', () => {
            expect(Bicicleta.allBicis.length).toBe(0);
            var aBici = new Bicicleta(1, 'rojo', 'urbana', [4.710703, -74.1145326]);
            var aBici2 = new Bicicleta(2, 'blanca', 'montaña', [4.6966124, -74.1499631]);
            Bicicleta.add(aBici);
            Bicicleta.add(aBici2);

            var targetBici = Bicicleta.findById(1);

            expect(targetBici.id).toBe(1);
            expect(targetBici.color).toBe(aBici.color);
            expect(targetBici.modelo).toBe(aBici.modelo);
            expect(targetBici.ubicacion).toEqual(aBici.ubicacion);
        });
        it('debe devolver un error si no existe la bicicleta', () => {
            expect(() => { Bicicleta.findById(999) }).toThrow();
        });
    });

    describe('Bicicleta.removeById', () => {
        it('debe eliminar la bicicleta con id 1', () => {
            expect(Bicicleta.allBicis.length).toBe(0);
            var aBici = new Bicicleta(1, 'rojo', 'urbana', [4.710703, -74.1145326]);
            var aBici2 = new Bicicleta(2, 'blanca', 'montaña', [4.6966124, -74.1499631]);
            Bicicleta.add(aBici);
            Bicicleta.add(aBici2);

            Bicicleta.removeById(1);

            expect(Bicicleta.allBicis.length).toBe(1);
            expect(Bicicleta.allBicis[0].id).toBe(2);
        });
    });
});
