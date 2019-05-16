window.onload=function(){
  map = new L.Map('map').setView([46.1220, 11.1876], 8);
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  imageUrl = './map/baseWgs84.png'
  imageBounds = [[46.06050, 11.08906], [46.16670, 11.23860]]
  base = L.imageOverlay(imageUrl, imageBounds).addTo(map)

  startView = L.Control.extend({
    options: { position: 'topleft'},
    onAdd: function (map) {
      var container = L.DomUtil.create('div', 'extentControl leaflet-bar leaflet-control leaflet-touch');
      btn=$("<a/>",{href:'#'}).appendTo(container);
      $("<i/>",{class:'fas fa-home'}).appendTo(btn)
      btn.on('click', function () {map.setView([46.1220, 11.1876], 8)});
      return container;
    }
  })

  geoLocBtn = L.Control.extend({
    options: { position: 'topleft'},
    onAdd: function (map) {
      var container = L.DomUtil.create('div', 'extentControl leaflet-bar leaflet-control leaflet-touch');
      btn=$("<a/>",{href:'#'}).appendTo(container);
      $("<i/>",{class:'fas fa-location-arrow'}).appendTo(btn)
      btn.on('click', function () {getLocation()});
      return container;
    }
  })

  augmentedBtn = L.Control.extend({
    options: { position: 'topleft'},
    onAdd: function (map) {
      var container = L.DomUtil.create('div', 'extentControl leaflet-bar leaflet-control leaflet-touch');
      btn=$("<a/>",{href:'#'}).appendTo(container);
      $("<i/>",{class:'fas fa-vr-cardboard'}).appendTo(btn)
      btn.on('click', function () {window.location.href='arTest.html'});
      return container;
    }
  })

  map.addControl(new startView());
  map.addControl(new geoLocBtn());
  map.addControl(new augmentedBtn());
}
function getLocation(){
  map.locate({setView: true, maxZoom: 18, watch:true, timeout: 60000,enableHighAccuracy:true});
  map.on('locationfound', onLocationFound);
}
function onLocationFound(e) {
  var radius = e.accuracy / 2;
  L.marker(e.latlng).addTo(map);
  L.circle(e.latlng, radius).addTo(map);
}
