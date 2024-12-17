function renderPreGame(parent) {
  client.page = "pregame";
  document.querySelector("#wrapper").innerHTML = "";
  renderHeader(document.querySelector("#wrapper"));
  const container = document.createElement("div");
  container.id = "preGameContainer";
  parent.appendChild(container);

  container.innerHTML = `
    <p id="first">It's time to<br> SpotYa friends!</p>
    <p id="second">Are you ready?</p>
    <button id="letsGoButton">Let's go!</button>`;
}
