function renderSignIn(parent) {
    document.querySelector("#wrapper").innerHTML = "";

    const container = document.createElement("div");
    container.id = "logInContainer";
    parent.appendChild(container);

    container.innerHTML = `
    <div id="logInTextContainer">
        <p>Welcome to SpotYa, <br>Sign in to continue</p>
        <p>Don't have an account? <span id = "createAccountLink"> Create an account here</span></p>
    </div>
    <div id="logInInputContainer">
        <div id="userNameContainerLogin">
            <p>Username</p>
            <input type="text" id="userNameInputLogIn">
        </div>
        <div id="passwordContainerLogin">
            <p>Password</p>
            <div id="passwordContainer">
                <input type="password" id="passwordInputLogIn">
                <img id="openEye" src="../../icons/openEye.svg">
            </div>
        </div>
    </div>
    <button id="signInButton">Sign in</button>`

    document.querySelector("#createAccountLink").addEventListener("click", () => {
        renderSignUp(document.querySelector("#wrapper"));
    })
}