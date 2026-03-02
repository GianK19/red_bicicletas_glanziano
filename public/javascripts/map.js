var map = L.map('main_map').setView([4.6481867, -74.1341518], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.marker([4.6963414, -74.1111205]).addTo(map)
L.marker([4.6414909, -74.0927215]).addTo(map)
L.marker([4.6056727, -74.0658467]).addTo(map)

$.ajax({
    dataType: 'json',
    url: '/api/bicicletas',
    success: function (result) {
        console.log(result);
        result.bicicletas.forEach(function (bici) {
            L.marker(bici.ubicacion, { title: bici.id }).addTo(map);
        });
    }
});
