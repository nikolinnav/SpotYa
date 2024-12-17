function renderProfile(parent) {
  client.page = "profile";
  // parent.innerHTML = ``
}

function renderProfileFriends(parent) {
  const title = document.createElement("div");
  title.className = "pf-title";
  title.appendChild(document.createTextNode("Friends"));
  parent.appendChild(title);

  const grid = document.createElement("div");
  grid.className = "avatar-grid";
  parent.appendChild(grid);

  return grid;

  // parent.innerHTML = `
  //     <div class="pf-title">Friends</div>
  //     <div class="avatar-grid">
  //     </div>
  // `
}

function renderAvatar(parent, nickname, imgSrc) {
  const container = document.createElement("div");
  container.className = "avatar";

  const div = document.createElement("div");
  const img = document.createElement("img");
  img.setAttribute("src", imgSrc);
  div.appendChild(img);

  const p = document.createElement("p");
  p.appendChild(document.createTextNode(nickname));

  const a = document.createElement("a");
  a.appendChild(document.createTextNode("x"));
  a.addEventListener("click", (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    console.log(`ta bort ${nickname}`);
    // implement delete friend here
  });

  container.appendChild(div);
  container.appendChild(p);
  container.appendChild(a);

  parent.appendChild(container);
}
