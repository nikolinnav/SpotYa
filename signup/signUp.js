function renderSignUp(parent) {
    document.querySelector("#wrapper").innerHTML = "";

    const container = document.createElement("div");
    container.id = "signUpContainer";
    parent.appendChild(container);

    container.innerHTML = `
    <div id="signUpTextContainer">
        <p>Welcome to SpotYa, <br>Create an account</p>
        <p>Already have an account? <span id = "logInLink"> Sign in here</span></p>
    </div>
    <div id="signUpInputContainer">
        <div id="userNameContainerSignUp">
            <p>Username</p>
            <input type="text" id="userNameInputSignUp">
        </div>
        <div id="passwordInputContainerSignUp">
            <p>Password</p>
            <input type="password" id="passwordInputSignUp">
        </div>
        <div id="confirmPasswordInputContainerSignUp">
            <p>Confirm password</p>
            <input type="password" id="confirmPasswordInputSignUp">
        </div>
    </div>
    <button id="signUpButton">Sign up</button>`

    document.querySelector("#logInLink").addEventListener("click", () => {
        renderSignIn(document.querySelector("#wrapper"));
    })
}