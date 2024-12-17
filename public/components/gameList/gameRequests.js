function renderGameRequests(parent) {
    renderHeader(document.querySelector("#wrapper"));

    const container = document.createElement("div");
    container.id = "gameRequestsContainer";
    parent.appendChild(container);

    container.innerHTML = `
    <p id="title">Game requests</p>
    <div class="requestContainer">
        <p class="gameRequestName">Game 1</p>
        <div class="peopleAndCreator">
            <div class="people">
                <svg width="12" class="peopleIcon" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.33333 2.66667C3.33333 1.95942 3.61428 1.28115 4.11438 0.781048C4.61448 0.280951 5.29276 0 6 0C6.70724 0 7.38552 0.280951 7.88562 0.781048C8.38572 1.28115 8.66667 1.95942 8.66667 2.66667C8.66667 3.37391 8.38572 4.05219 7.88562 4.55229C7.38552 5.05238 6.70724 5.33333 6 5.33333C5.29276 5.33333 4.61448 5.05238 4.11438 4.55229C3.61428 4.05219 3.33333 3.37391 3.33333 2.66667ZM3.33333 6.66667C2.44928 6.66667 1.60143 7.01786 0.976311 7.64298C0.351189 8.2681 0 9.11594 0 10C0 10.5304 0.210714 11.0391 0.585787 11.4142C0.960859 11.7893 1.46957 12 2 12H10C10.5304 12 11.0391 11.7893 11.4142 11.4142C11.7893 11.0391 12 10.5304 12 10C12 9.11594 11.6488 8.2681 11.0237 7.64298C10.3986 7.01786 9.55072 6.66667 8.66667 6.66667H3.33333Z" fill="#A6A6A6"/>
                </svg>
                <p class="peopleNumber">6</p>
            </div>
            <p class="creator">Someone created the game</p>
        </div>
        <div class="removeAndApprove">
            <button class="removeButton">Remove</button>
            <button class="approveButton">Approve</button>
        </div>

    </div>
    `
}