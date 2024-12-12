function renderPreviewPhoto(parent) {
    renderHeader(document.querySelector("#wrapper"));

    const container = document.createElement("div");
    container.id = "previewPhotoContainer";
    parent.appendChild(container);

    container.innerHTML = `
    <div id="userContainer">
        <div id="profilePhoto"></div>
        <p id="userName">Name</p>
    </div>
    <div id="previewPhoto"></div>

    <div id="countdownContainer">
        <div id="numberCountdown">7</div>
        <div id="progressContainer">
            <div id="progress"></div>
        </div>
    </div>
    
    `
}