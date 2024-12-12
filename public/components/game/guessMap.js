function renderGuessMap (parent){
    renderHeader(document.querySelector("#wrapper"));

    const container = document.createElement("div");
    container.id = "guessMapContainer";
    parent.appendChild(container);

    container.innerHTML = `
    <div id="map"></div>
    <button id="spotYaButton">SpotYa</button>
    
    `
}