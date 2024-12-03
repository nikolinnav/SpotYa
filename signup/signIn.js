function renderSignIn(parent) {
    document.querySelector("#wrapper").innerHTML = "";

    const container = document.createElement("div");
    container.id = "logInContainer";
    parent.appendChild(container);

    container.innerHTML = `
    <div id="logInTextContainer">
        <p>Welcome to SpotYa, <br>Sign in to continue</p>
        <p>Don´t have an account? <span id = "createAccountLink"> Create an account here</span></p>
    </div>
    <div id="logInInputContainer">
        <div id="userNameContainer">
            <p>Username</p>
            <input type="text" id="userNameInput">
        </div>
        <div id="passwordInputContainer">
            <p>Password</p>
            <input type="password" id="passwordInput">
        </div>
    </div>
    <button>Sign in</button>
        `

}