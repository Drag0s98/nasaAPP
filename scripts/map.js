const mapId = "map";
const initialCoordinates = [40.4169473, -3.7057172]; // Plaza Sol en Madrid [lat, lng]
console.log('holaaaa');
const map = L.map(mapId).setView(initialCoordinates, 13);
const MAPBOX_API =
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}";

const ATTRIBUTION =
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
// Este token será el que obtengamos en la web de Mapbox
const ACCESS_TOKEN =
    "pk.eyJ1IjoiZHJhZzBzOTgiLCJhIjoiY2tyNjF4anIwMDF2NzJubWF5bG92Y2J2ZiJ9.Rb7RFUVViJK1euBDQ-jnFA";

L.tileLayer(MAPBOX_API, {
    attribution: ATTRIBUTION,
    maxZoom: 18,
    id: "mapbox/satellite-streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: ACCESS_TOKEN,

}).addTo(map);
