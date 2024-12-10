function renderHeader(parent) {
    const headerContainer = document.createElement("div");
    headerContainer.id = "headerContainer";
    parent.appendChild(headerContainer);

    headerContainer.innerHTML = `
    <svg id="back" width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 1.47109L8.51275 0L0.412044 8.01742C0.281465 8.14589 0.177836 8.29866 0.107121 8.46693C0.0364052 8.6352 0 8.81566 0 8.99792C0 9.18017 0.0364052 9.36063 0.107121 9.5289C0.177836 9.69718 0.281465 9.84994 0.412044 9.97841L8.51275 18L9.9986 16.5289L2.39552 9L10 1.47109Z" fill="white"/>
    </svg>
    <p id="name">SpotYa</p>
    `
}