function renderPreGame(parent) {
    renderHeader(document.querySelector("#wrapper"));
    const container = document.createElement("div");
    container.id = "preGameContainer";
    parent.appendChild(container);

    container.innerHTML = `
    <p id="first">It's time to SpotYa friends!</p>
    <p id="second">Are you ready?</p>
    <button id="letsGoButton">Let's go!</button>`
}