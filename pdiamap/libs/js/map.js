		
function init() { 

 //New Map
  var map = L.map('map',{zoomControl: false}).setView([40.410368, -3.734896],6); 

//Add custom ZoomControl with ZoomHome
  var zoomHome = L.Control.zoomHome();
  zoomHome.addTo(map);

  //OpenSteetMaps Basemap
  var basemap = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  });

  // World Street Map d'ESRI
  var esri = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'ESRI &copy;'
  }).addTo(map);

  //Satèl·lit basemap d'ESRI
  var sat = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; &mdash; Source: Esri'
  });


  //Font Awesome Style
  var style = L.AwesomeMarkers.icon ({
    icon: 'shopping-cart',
    prefix: 'fa',
    markerColor: 'darkred'
  });  

  // Layer tiendas
  var tiendas = L.geoJson(null, {
    style: function (feature) {
      return feature.properties && feature.properties.style;
    },  
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, 
        {icon:style}); 
    },
    onEachFeature: function(feature, layer) {
      layer.bindPopup('<h5 align="center"><b> Store ID: ' + feature.properties.tienda + '</b></h5>');
    }
  }).addTo(map);


  // Layer clients
  var clients = L.geoJson(null, {
      style: function (feature) {
        return {
        color: "#000000",
        weight: 0.25,
        opacity: 0.5,
        fillOpacity: 10 
        };
      }   
  }).addTo(map);
   

  //Uploading the GeoJSONs
  $.getJSON('geojson/clients.geojson', function(data){
    clients.addData(data);
  });  

  $.getJSON('geojson/tiendas.geojson', function(data){
    tiendas.addData(data);
  }); 
  
  $.getJSON('geojson/servicearea.geojson', function(data){
    servicearea.addData(data);
  });  


  var baseLayers = {
    "Callejero": esri,
    "Open Street Map": basemap,    
    "Satelite": sat 
  };
  
  var overLayers = {
    "Stores": tiendas,
    "Clients": clients
    //"Service Area": servicearea 
  }; 
  
  //Layer and Scale Controls
  L.control.layers (baseLayers, overLayers,{collapsed: false}).addTo(map); 
  L.control.scale().addTo(map);
   
  //Leaflet Search
  //Canviat l'atribut "title" per "Sfid" a l'arxiu base del plugin
  map.addControl( new L.Control.Search({layer:tiendas}) ); 
  
}	



