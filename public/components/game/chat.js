function renderChat(parent) {
    document.querySelector("#wrapper").innerHTML = "";
    renderHeader(document.querySelector("#wrapper"));

    const container = document.createElement("div");
    container.id = "chatContainer";
    parent.appendChild(container);

    container.innerHTML = `
    <div class="chatContainerFriends">
        <div class="profilePhotoContainer"></div>
        <div class="chatBubbleContainer">
            <div class="chatBubbleFriends">
                <p class="textFriends">Vad bra du spelade!</p>
            </div>
            <p class="sentBy">Ralf 4h ago</p>
        </div>
    </div>

    <div class="chatContainerMe">
        <div class="chatBubbleMe">
            <p class="textMe">Vad bra du spelade!</p>
        </div>
    </div>
    `

    renderInGameNav(document.querySelector("#wrapper"));
}