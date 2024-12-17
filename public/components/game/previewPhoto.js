function renderPreviewPhoto(parent) {
  client.page = "previewphoto";
  document.querySelector("#wrapper").innerHTML = "";
  renderHeader(document.querySelector("#wrapper"));

  const container = document.createElement("div");
  container.id = "previewPhotoContainer";
  parent.appendChild(container);

  container.innerHTML = `
    <div id="userContainer">
        <div id="profilePhoto"></div>
        <p id="userName">Name</p>
    </div>
    <div id="previewPhoto"></div>

    <div id="countdownContainer">
        <div id="numberCountdown"></div>
        <div id="progressContainer">
            <div id="progress"></div>
        </div>
    </div>
    
    `;

  let timeLeft = 15;
  const countdownElement = document.querySelector("#numberCountdown");
  const progressElement = document.querySelector("#progress");

  const countdownInterval = setInterval(() => {
    // Update countdown number
    countdownElement.textContent = timeLeft;

    // Update progress bar width
    const progressWidth = (timeLeft / 15) * 100; // Calculate percentage
    progressElement.style.width = progressWidth + "%";

    // Decrement timeLeft
    timeLeft--;

    // When countdown finishes, stop the interval and handle logic after countdown
    if (timeLeft < 0) {
      clearInterval(countdownInterval);
      // Optionally, you can call another function or change the UI after countdown
      console.log("Countdown finished!");
      renderGuessMap(document.querySelector("#wrapper"));
    }
  }, 1000); // Update every second (1000 milliseconds)
}
