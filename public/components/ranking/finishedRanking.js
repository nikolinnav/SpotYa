function renderFinishedRanking(parent) {
    document.querySelector("#wrapper").innerHTML = "";
    renderHeader(document.querySelector("#wrapper"));

    const container = document.createElement("div");
    container.id = "finishedRankingContainer";
    parent.appendChild(container);

    container.innerHTML = `
    <div id="podium"> 
        <div>
            <div>
                <div class="profilePhoto"></div>
                <p class="username">Username</p>
            </div>
            <div id="podium1">
                <p class="placePodium">2<sup>nd</sup></p>
                <div class="pointsPodium">1234p</div>
            </div>
        </div>
        <div>
            <div id="podium2User">
                <div class="profilePhoto"></div>
                <p class="username">Username</p>
            </div>
            <div id="podium2">
                <p class="placePodium">1<sup>st</sup></p>
                <div class="pointsPodium">3553p</div>
            </div>
        </div>
        <div>
            <div>
                <div class="profilePhoto"></div>
                <p class="username">Username</p>
            </div>
            <div id="podium3">
                <p class="placePodium">3<sup>rd</sup></p>
                <div class="pointsPodium">876p</div>
            </div>
        </div>
    </div>


    <div id="finishedRankList">
        <div class="rankListElement">
            <div class="leftContainer">
                <p class="finishedPlace">1</p>
                <div class="listProfilePhoto"></div>
                <p class="listUsername">Username</p>
            </div>
            <p class="finishedPoints">1234p</p>
        </div>
    </div>

    `
}