var map = L.map('main_map').setView([4.60971, -74.08175], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.marker([4.60971, -74.08245]).addTo(map)
L.marker([4.60971, -74.08455]).addTo(map)
L.marker([4.60971, -74.08105]).addTo(map)