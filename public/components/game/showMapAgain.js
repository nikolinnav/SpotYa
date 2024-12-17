function renderShowMapAgain(parent) {
    document.querySelector("#wrapper").innerHTML = "";
    renderHeader(document.querySelector("#wrapper"));

    const container = document.createElement("div");
    container.id = "showMapAgainContainer";
    parent.appendChild(container);

    container.innerHTML = `
    <div id="userContainer">
         <div id="profilePhoto"></div>
        <p id="userName">Name</p>
    </div>
    <div id="map"></div>
   
       
    `
    renderInGameNav(document.querySelector("#wrapper"));
}