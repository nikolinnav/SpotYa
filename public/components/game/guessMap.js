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
    <div id="buyTime">
        <div id="lightBulb">
             <svg id="lightBulbIcon" width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.00401 17.2857H11.9962V18.8571H4.00401V17.2857ZM5.60244 20.4286H10.3977V22H5.60244V20.4286ZM8.00009 0C5.88044 0 3.8476 0.827804 2.34879 2.3013C0.849967 3.7748 0.00793927 5.7733 0.00793927 7.85714C-0.0461082 8.99905 0.176393 10.1373 0.657138 11.1781C1.13788 12.219 1.86313 13.1328 2.77322 13.8443C3.57244 14.575 4.00401 14.9914 4.00401 15.7143H5.60244C5.60244 14.2686 4.71532 13.4593 3.85216 12.6814C3.10518 12.1191 2.50986 11.3852 2.11833 10.5442C1.7268 9.7031 1.55102 8.78049 1.60637 7.85714C1.60637 6.19007 2.27999 4.59127 3.47905 3.41247C4.6781 2.23367 6.30437 1.57143 8.00009 1.57143C9.69581 1.57143 11.3221 2.23367 12.5211 3.41247C13.7202 4.59127 14.3938 6.19007 14.3938 7.85714C14.4482 8.78117 14.2712 9.70422 13.8783 10.5453C13.4853 11.3864 12.8885 12.1199 12.14 12.6814C11.2849 13.4671 10.3977 14.2529 10.3977 15.7143H11.9962C11.9962 14.9914 12.4197 14.575 13.227 13.8364C14.1364 13.1261 14.8613 12.2137 15.3421 11.1742C15.8228 10.1347 16.0457 8.99783 15.9922 7.85714C15.9922 6.82533 15.7855 5.80362 15.3839 4.85034C14.9822 3.89707 14.3935 3.03091 13.6514 2.3013C12.9093 1.5717 12.0282 0.992948 11.0585 0.598089C10.0889 0.203231 9.04963 0 8.00009 0Z" fill="white"/>
            </svg>
        </div>
        <div id="text">
            <p id="buySec">Buy 15 more seconds</p>
            <p id="minusPoints">- 10p</p>
        </div>
            <svg id="arrowIcon" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.15694 7.71163L1.49994 13.3686L0.0859375 11.9546L5.03594 7.00462L0.0859375 2.05463L1.49994 0.640625L7.15694 6.29763C7.34441 6.48515 7.44972 6.73946 7.44972 7.00462C7.44972 7.26979 7.34441 7.5241 7.15694 7.71163Z" fill="white"/>
            </svg>

    </div>
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

document.querySelector("#spotYaButton").addEventListener("click", function () {
  renderRanking(document.querySelector("#wrapper"));
});

document.querySelector("#buyTime").addEventListener("click", function () {
  renderPreviewPhoto(document.querySelector("#wrapper"));
});
