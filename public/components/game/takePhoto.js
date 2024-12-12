function renderTakePhoto(parent) {
    document.querySelector("#wrapper").innerHTML = "";
    renderHeader(document.querySelector("#wrapper"));

    const container = document.createElement("div");
    container.id = "takePhotoContainer";
    parent.appendChild(container);


    container.innerHTML = `
    <div id="photo"> </div>
    <div id="buttonContainer">
        <button id="takePhotoButton"></button>
    </div>
    `
}