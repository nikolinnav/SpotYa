function renderRanking(parent) {
  client.page = "ranking";
  document.querySelector("#wrapper").innerHTML = "";
  renderHeader(document.querySelector("#wrapper"));
  const container = document.createElement("div");
  container.id = "rankingContainer";
  parent.appendChild(container);

  container.innerHTML = `
    <div id="headerRanking">
        <div id="headerLeft">
            <p id="pos">Pos</p>
            <p id="rankName">Name</p>
        </div>
        <div id="headerRight">
            <p id="round">Round</p>
            <p id="total">Total</p>
        </div>
    </div>
    <div id="rankListContainer">
        <div class="listElement">
            <div class="listLeft">
                <div class="upOrDown"></div>
                <p class="place">1</p>
                <div class="profilePhoto"></div>
                <p class="listName">Name</p>
            </div>
            <div class="listRight">
                <p class="roundPoints">15</p>
                <p class="totalPoints">35</p>
            </div>
        </div>
    </div>
    `;

  renderInGameNav(document.querySelector("#wrapper"));
}
