"use strict";

class Client {
  constructor(page, socket) {
    this.page = page;
    this._socket = socket;
    this.gameInvites = [];
    this.friendRequests = [];
  }

  get socket() {
    return this._socket;
  }

  set socket(value) {
    this._socket = value;
    // additional logic
    this._socket.addEventListener("open", () => {});
    this._socket.addEventListener("close", () => {});
    this._socket.addEventListener("error", () => {});
    this._socket.addEventListener("message", (e) => {
      const { event, data } = JSON.parse(e.data);
      switch (event) {
        case "sv:user": {
          switch (this.page) {
            case "login": {
              console.log("sv:user login");
              return;
            }

            default:
              return;
          }
        }

        case "sv:allFriends": {
          switch (this.page) {
            case "login": {
              console.log("sv:allFriends login");
              return;
            }

            default:
              return;
          }
        }

        case "sv:friend": {
          switch (this.page) {
            case "login": {
              console.log("sv:friend login");
              return;
            }

            default:
              return;
          }
        }

        case "sv:allGames": {
          switch (this.page) {
            case "gamelist": {
              for (const gameId of data.games) {
                this.socket.send(
                  JSON.stringify({ type: "cl:getGame", data: { gameId } })
                );
              }
              return;
            }

            default:
              return;
          }
        }

        case "sv:game": {
          switch (this.page) {
            case "gamelist": {
              const gameObj = data.game;
              if (!gameObj.finished) {
                const activeGamesCtrDom =
                  document.querySelector("#activeGameCards");
                if (activeGamesCtrDom) {
                  renderActiveGameCard(activeGamesCtrDom, gameObj);
                }
              }

              return;
            }

            default:
              return;
          }
        }

        case "sv:gameCreated": {
          switch (this.page) {
            case "gamelist": {
              console.log("Game created: ", data.gameId);
            }
          }
        }

        case "sv:friendAdded": {
          switch (this.page) {
            case "login": {
              console.log("sv:friendAdded login");
              return;
            }

            default:
              return;
          }
        }

        case "sv:friendRequest": {
          switch (this.page) {
            case "login": {
              console.log("sv:friendRequest login");
              return;
            }

            default:
              return;
          }
        }

        case "sv:gameInvitation": {
          this.gameInvites.push(data.gameId);
          console.log("You got a game invitation for game: ", data.gameId);
          switch (this.page) {
            case "gamelist": {
              console.log("sv:gameInvitation login");
              return;
            }

            default:
              return;
          }
        }

        case "sv:gameStarted": {
          switch (this.page) {
            case "login": {
              console.log("sv:gameStarted login");
              return;
            }

            default:
              return;
          }
        }

        case "sv:gameUpdate": {
          switch (this.page) {
            case "login": {
              console.log("sv:gameUpdate login");
              return;
            }

            default:
              return;
          }
        }
      }
    });
  }
}

const client = new Client(null, null);

function renderActiveGameCard(parent) {
  const container = document.createElement("div");
  container.id = "activeGameCard";
  parent.appendChild(container);

  container.innerHTML = `
    <div id="nameAndTime">
        <p id="gameNameActive">Game name</p>
        <p id="time"> 12:30 left</p>
    </div>
    <div id="roundsAndPeople">
        <div id="rounds">
            <svg id="roundsIcon" width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 1.99862V0.879865C5 0.598615 4.6625 0.461115 4.46875 0.661115L2.71875 2.40487C2.59375 2.52987 2.59375 2.72362 2.71875 2.84862L4.4625 4.59237C4.6625 4.78612 5 4.64862 5 4.36737V3.24862C7.06875 3.24862 8.75 4.92987 8.75 6.99862C8.75 7.49237 8.65625 7.97362 8.475 8.40487C8.38125 8.62987 8.45 8.88612 8.61875 9.05486C8.9375 9.37362 9.475 9.26112 9.64375 8.84237C9.875 8.27362 10 7.64862 10 6.99862C10 4.23612 7.7625 1.99862 5 1.99862ZM5 10.7486C2.93125 10.7486 1.25 9.06737 1.25 6.99862C1.25 6.50487 1.34375 6.02362 1.525 5.59237C1.61875 5.36737 1.55 5.11112 1.38125 4.94237C1.0625 4.62362 0.525 4.73612 0.35625 5.15487C0.125 5.72362 0 6.34862 0 6.99862C0 9.76112 2.2375 11.9986 5 11.9986V13.1174C5 13.3986 5.3375 13.5361 5.53125 13.3361L7.275 11.5924C7.4 11.4674 7.4 11.2736 7.275 11.1486L5.53125 9.40487C5.48719 9.36168 5.43133 9.33249 5.37071 9.321C5.3101 9.30951 5.24743 9.31621 5.19062 9.34027C5.13381 9.36434 5.08539 9.40468 5.05147 9.45621C5.01755 9.50775 4.99964 9.56817 5 9.62986V10.7486Z" fill="#ACACAC"/>
            </svg>
            <p id="roundsP">2/6</p>
        </div>
        <div id="people">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.33333 2.66667C3.33333 1.95942 3.61428 1.28115 4.11438 0.781048C4.61448 0.280951 5.29276 0 6 0C6.70724 0 7.38552 0.280951 7.88562 0.781048C8.38572 1.28115 8.66667 1.95942 8.66667 2.66667C8.66667 3.37391 8.38572 4.05219 7.88562 4.55229C7.38552 5.05238 6.70724 5.33333 6 5.33333C5.29276 5.33333 4.61448 5.05238 4.11438 4.55229C3.61428 4.05219 3.33333 3.37391 3.33333 2.66667ZM3.33333 6.66667C2.44928 6.66667 1.60143 7.01786 0.976311 7.64298C0.351189 8.2681 0 9.11594 0 10C0 10.5304 0.210714 11.0391 0.585787 11.4142C0.960859 11.7893 1.46957 12 2 12H10C10.5304 12 11.0391 11.7893 11.4142 11.4142C11.7893 11.0391 12 10.5304 12 10C12 9.11594 11.6488 8.2681 11.0237 7.64298C10.3986 7.01786 9.55072 6.66667 8.66667 6.66667H3.33333Z" fill="#A6A6A6"/>
            </svg>
            <p id="peopleP">6</p>
        </div>
    </div>
    <div id="gameCardTags">
        <div id="guessTag">
        <p>Guess</p>
    </div>
    <div id="placeTag">
        <p>3rd place right now!</p>
    </div>
    </div>
    `;
}
