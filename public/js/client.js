"use strict";

class Client {
  constructor(page, socket) {
    this.page = page;
    this._socket = socket;
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
            case "login": {
              console.log("sv:allGames login");
              return;
            }

            default:
              return;
          }
        }

        case "sv:game": {
          switch (this.page) {
            case "login": {
              console.log("sv:game login");
              return;
            }

            default:
              return;
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
          switch (this.page) {
            case "login": {
              console.log("sv:gameInvitation login");
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
