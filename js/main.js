
////////////////////////////////BASEMAP
// L.map instanziiert die Webmap. Die Variable 'map' muss mit der DOM ID des div-elements im HTML-Dokument
// übereinstimmen. Center und zoom legen fest, wie die Karte bei Aufruf angezeigt wird. 

var map = L.map('map', {
	center: [ 53.947621, 8.436162], 
	zoom: 15
});

// Basemaps werden mit L.tileLayer instanziiert. Die Attributation ist wichtig, um zu zeigen, woher die Basemap kommt. 
// Minzoom und maxzoom sind praktisch, um das mindest bzw. höchste Zoomlevel für den User zu regeln. 

var OpenStreetMap_DE = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {id:'map', 

	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
//-------------------------------------------------------------------------------------------------------------------------------------------------------TASK: nach API für Luftbildkarte schauen und ggfs als alternative mit layer-control einfügen :)



///////////////////////////////GeoJSON Datei einbinden
var SchlossIcon = L.icon({
    iconUrl: 'pics/bird.png',                               //von flatincon
    iconSize:     [35, 35] // size of the icon
});

//Hier werden die Daten aus der GeoJSON Datei geladen und festgelegt, mit welchem Icon sie visualsiert werden. Außerdem wird hier das Pop-up Event
//eingebaut, das unten definiert wird.
/*var Schloss = L.geoJson (BK_NG_2010_Einzeln_FeaturesT, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {icon:SchlossIcon});
    },
  onEachFeature: onEachSchloss
}).addTo(map);

var BKLayer = L.geoJSON().addTo(map);
myLayer.addData(BK_NG_2010_Einzeln_FeaturesT);
*/

//Einzeln kartierte Arten
var BKlayerEinzeln = L.geoJSON(undefined, {
	onEachFeature: onEachEinzeln,
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, { icon: SchlossIcon })
	},
}).addTo(map);

//Kolonien
var BKlayerKolonie = L.geoJSON(undefined, { onEachFeature: onEachKolonie }).addTo(map);

//Einzeln kartierte Arten
fetch("data/BK_NG_2010_Einzeln.geojson", { mode: 'no-cors' })
	.then(function(response) {
		return response.json();
	})
	.then(function(data) {
		console.log(data);
		BKlayerEinzeln.addData(data);
	});
	
//Kolonien
fetch("data/BK_NG_2010_Kolonien.geojson", { mode: 'no-cors' })
	.then(function(response) {
		return response.json();
	})
	.then(function(data) {
		console.log(data);
		BKlayerKolonie.addData(data);
	});



///////////////////////////////////////Pop-up Events

//Einzeln kartierte Arten
function onEachEinzeln (feature, layer) {
   layer.bindPopup(
      feature.properties.Art);
   layer.on({
      click: zoomToMarker
     })
};

//Kolonien
function onEachKolonie (feature, layer) {
   layer.bindPopup(
      feature.properties.Art + '<br>' +
      'Anzahl: ' + feature.properties.Anzahl + ' Brutpaare' );
   layer.on({
      click: zoomToMarker
     })
};

//Zoom auf Pop-up nach Klick
function zoomToMarker(e) {
  map.setView(e.latlng, 16)}; 



/////////////////////////////////Scale-bar
L.control.scale().addTo(map);


///////////////////////////////LAYER-CONTROL//////////////////////////////////////////////////////////////////////////////////////////
//Erstellen der Objekte zur layer control. 3 basemaps und 1 overlay, also die Daten der Schlösser, die nach Belieben über die basemaps gelegt werden sollen.
//var baseMaps = {
 //   "OSM": OpenStreetMap_DE,
  //  "Light": Stamen_TonerLite,
   // "Watercolor": Stamen_Watercolor
//};

//var overlayMaps = {
 //   "Schlösser & Burgen": Schloss
//};

//////Layer-control an sich. Die Funktionen sind dabei optional. Es kann also auch eine layer control ohne eine overlayMap geben.
//L.control.layers(baseMaps, overlayMaps).addTo(map);


//Begrüßungsnachricht
alert("Hey Kompaktseminarteilnehmer, viel Spaß beim birdwatching! :)");





