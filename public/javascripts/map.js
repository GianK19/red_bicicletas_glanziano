var map = L.map('main_map').setView([4.6481867, -74.1341518], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.marker([4.6963414, -74.1111205]).addTo(map)
L.marker([4.710703, -74.1145326]).addTo(map)
L.marker([4.6966124, -74.1499631]).addTo(map)