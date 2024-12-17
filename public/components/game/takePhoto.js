function renderTakePhoto(parent) {
  client.page = "takephoto";
  const prePhotoHTML = `<div id="photo">
    
    <video id="video-stream"></video>    
    </div>
    <div id="buttonContainer">
        <button id="takePhotoButton"></button>
        <button id="switch-camera-button">Switch Camera</button> 
    </div>
    <canvas id="canvas"> </canvas>`;
  document.querySelector("#wrapper").innerHTML = "";
  renderHeader(document.querySelector("#wrapper"));

  const container = document.createElement("div");
  container.id = "takePhotoContainer";
  parent.appendChild(container);

  container.innerHTML = prePhotoHTML;

  let currentStream = null;
  let cameraDevices = [];
  let currentCameraIndex = 0;

  const videoDom = document.getElementById("video-stream");
  const photoContainer = document.getElementById("photo");
  const photoOutputDom = document.getElementById("photo-output");
  const buttonCtrDom = document.getElementById("buttonContainer");
  const photoBtnDom = document.getElementById("takePhotoButton");
  const switchCamBtn = document.getElementById("switch-camera-button");

  navigator.mediaDevices
    .enumerateDevices()
    .then((devices) => {
      cameraDevices = devices.filter((device) => device.kind === "videoinput");

      if (cameraDevices.length === 0) {
        console.error("No cameras found");
        return;
      }

      startCameraStream(currentCameraIndex);

      switchCamBtn.addEventListener("click", () => {
        if (cameraDevices.length <= 1) {
          console.log("No other cameras to switch to");
          return;
        }

        currentCameraIndex = (currentCameraIndex + 1) % cameraDevices.length;

        startCameraStream(currentCameraIndex);
      });
    })
    .catch((err) => {
      console.error(`Error enumerating devices: ${err}`);
    });
  photoBtnDom.addEventListener("click", (ev) => {
    takePhoto();
    ev.preventDefault();
  });

  function takePhoto() {
    const ctx = canvas.getContext("2d");
    const width = 640;
    const height = 480;
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(videoDom, 0, 0, width, height);

      const data = canvas.toDataURL("image/png");
      canvas.width = 0;
      canvas.height = 0;
      photoContainer.innerHTML = `<div id="output-container">
        <img id="photo-output" src="${data}" alt="The screen capture will appear in this box." />
    </div>`;
      buttonCtrDom.innerHTML = `
        <button id="takePhotoButton"></button><button id="retake-camera-button">Take again</button>`;
    }
  }

  function startCameraStream(cameraIndex) {
    const deviceId = cameraDevices[cameraIndex].deviceId;

    if (currentStream) {
      currentStream.getTracks().forEach((track) => track.stop());
    }

    // Start new stream with the selected camera
    navigator.mediaDevices
      .getUserMedia({ video: { deviceId }, audio: false })
      .then((stream) => {
        currentStream = stream;
        videoDom.srcObject = stream;
        videoDom.play();
      })
      .catch((err) => {
        console.error(`Error starting camera: ${err}`);
      });
  }
}
