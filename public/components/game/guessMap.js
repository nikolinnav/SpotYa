function renderGuessMap(parent) {
  client.page = "guessmap";
  document.querySelector("#wrapper").innerHTML = "";
  renderHeader(document.querySelector("#wrapper"));

  const container = document.createElement("div");
  container.id = "guessMapContainer";
  parent.appendChild(container);
  container.innerHTML = `
      <div id="map"></div>
      <button id="spotYaButton">SpotYa</button>
      `;

  const map = L.map("map").setView([51.505, -0.09], 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  const opt = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  let currentMarker = null;
  const selectedLocation = {};

  // Custom red dot icon
  const redDotIcon = L.icon({
    iconUrl: "../../icons/mapLocation.png",
    iconSize: [16, 16],
    iconAnchor: [6, 6],
  });

  map.on("click", async (e) => {
    const { lat, lng } = e.latlng;

    if (currentMarker) {
      map.removeLayer(currentMarker);
    }

    currentMarker = L.marker([lat, lng]).addTo(map);
    selectedLocation.latitude = lat;
    selectedLocation.longitude = lng;
    console.log(selectedLocation);

    const areaInfo = await fetchAreaName(lat, lng);
    const address = areaInfo.house_number
      ? `${areaInfo.road} ${areaInfo.house_number}`
      : areaInfo.road;
    const str = `${
      areaInfo.house_number
        ? `${areaInfo.house_number} ${areaInfo.road} `
        : areaInfo.road
    }, ${areaInfo.suburb}, ${areaInfo.city}, ${areaInfo.country}`;
    currentMarker
      .bindPopup(`(${lat.toFixed(6)}, ${lng.toFixed(6)})<br>${str}`)
      .openPopup();
  });

  // DEBUGGING: Handle user geolocation
  function success(pos) {
    const crd = pos.coords;

    L.marker([crd.latitude, crd.longitude], { icon: redDotIcon })
      .addTo(map)
      .bindPopup("This is your current location.")
      .openPopup();

    map.setView([crd.latitude, crd.longitude], 13);
  }

  navigator.geolocation.getCurrentPosition(
    success,
    () => {
      console.error("Error getting location");
    },
    opt
  );
}

async function fetchAreaName(lat, lng) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
  );
  const data = await response.json();
  return (
    ({ country, city, suburb, road, house_number } = data.address) ||
    "Unknown location"
  );
}
