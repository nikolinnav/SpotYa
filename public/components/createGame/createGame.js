function renderCreateGame(parent) {
    parent.innerHTML = `
        <section id="createGameTitleContainer"></section>
        <section id="createGameInfoContainer"></section>
        <section id="createGamePLayersContainer"></section>
        <section id="createGameButtonContainer"></section>
    `

    renderTitle(document.querySelector('#createGameTitleContainer'))
    renderGameInfo(document.querySelector('#createGameInfoContainer'))

    const grid = renderGamePlayers(document.querySelector('#createGamePLayersContainer'))

    // TODO: Fetch users friends 
    // TODO: Skapa loop med resultatet från fetch!
    renderAvatarPlayers(grid, 'Lisa', '')
    renderAvatarPlayers(grid, 'Kalle', '')
    renderAvatarPlayers(grid, 'Linus', '')
    renderAvatarPlayers(grid, 'Ulla', '')
    renderAvatarPlayers(grid, 'Greta', '')

    addplayersButton(grid) 

    renderSendInvite(document.querySelector('#createGameButtonContainer'))
}


function renderTitle(parent) {
    const title = document.createElement('div')
    title.innerHTML = `Create a new game!`
    title.id = 'newGameTitle'

    parent.appendChild(title)
}


function renderGameInfo(parent) {
    const gameNameContainer = document.createElement('div')
    gameNameContainer.id = 'gameNameContainer'

    const title = document.createElement('div')
    title.innerHTML = `Game name`
    title.id = 'gameNameTitle'
    
    const inputEl = document.createElement('input')
    inputEl.id = 'addGameName'

    inputEl.addEventListener('keydown', (event) => {
    console.log(event.target.value)
    })


    gameNameContainer.appendChild(title)
    gameNameContainer.appendChild(inputEl)
    parent.appendChild(gameNameContainer)
}


function renderGamePlayers(parent) {
    const title = document.createElement('div')
    title.className = 'playersTitle'
    title.appendChild(document.createTextNode('Players'))
    parent.appendChild(title)

    const grid = document.createElement('div')
    grid.className = 'avatar-grid'
    parent.appendChild(grid)

    return grid
  
}

function renderAvatarPlayers(parent, name, imgSrc) {
    const container = document.createElement('div')
    container.className = 'avatar'

    const div = document.createElement('div')
    const img = document.createElement('img')
    img.setAttribute('src', imgSrc)
    div.appendChild(img)

    const p = document.createElement('p')
    p.appendChild(document.createTextNode(name))

    const a = document.createElement('a')
    a.innerHTML = `<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.10526 0.180458C0.984012 0.063356 0.821625 -0.0014404 0.65307 2.43017e-05C0.484515 0.001489 0.323279 0.0690976 0.204088 0.188289C0.0848967 0.307479 0.0172881 0.468716 0.0158234 0.637271C0.0143587 0.805826 0.0791551 0.968213 0.196257 1.08946L3.5989 4.4921L0.196257 7.89474C0.134857 7.95404 0.085883 8.02498 0.0521915 8.10341C0.0185 8.18184 0.000766011 8.2662 2.42722e-05 8.35156C-0.000717467 8.43691 0.0155479 8.52157 0.0478713 8.60057C0.0801948 8.67958 0.127929 8.75135 0.188289 8.81171C0.248648 8.87207 0.320424 8.91981 0.399429 8.95213C0.478434 8.98445 0.563085 9.00072 0.648443 8.99998C0.733801 8.99923 0.818157 8.9815 0.896588 8.94781C0.975019 8.91412 1.04596 8.86514 1.10526 8.80374L4.5079 5.4011L7.91054 8.80374C8.03179 8.92085 8.19417 8.98564 8.36273 8.98418C8.53128 8.98271 8.69252 8.9151 8.81171 8.79591C8.9309 8.67672 8.99851 8.51548 8.99998 8.34693C9.00144 8.17837 8.93664 8.01599 8.81954 7.89474L5.4169 4.4921L8.81954 1.08946C8.93664 0.968213 9.00144 0.805826 8.99998 0.637271C8.99851 0.468716 8.9309 0.307479 8.81171 0.188289C8.69252 0.0690976 8.53128 0.001489 8.36273 2.43017e-05C8.19417 -0.0014404 8.03179 0.063356 7.91054 0.180458L4.5079 3.5831L1.10526 0.180458Z" fill="#C7C7C7"/>
    </svg>`

    a.addEventListener('click', (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        console.log(`ta spelare ${name}`)
        // implement delete player here
    })

    container.appendChild(div)
    container.appendChild(p)
    container.appendChild(a)

    parent.appendChild(container)
}

function addplayersButton(parent) {
    const container = document.createElement('div')
    container.className = `addFriendsButton`
    const div = document.createElement('div')
    

    const plus = document.createElement('a')
    plus.innerHTML = `<svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.14286 11.3571H0V8.64286H8.14286V0.5H10.8571V8.64286H19V11.3571H10.8571V19.5H8.14286V11.3571Z" fill="white"/>
        </svg>
        `
    plus.addEventListener('click', (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        console.log(`Till vy för addPlayers`)
        renderSearchFriends(document.querySelector("#wrapper"))
    })

    parent.appendChild(container)
    container.appendChild(div)
    div.appendChild(plus)
}



function renderSendInvite(parent) {
    const sendInviteBtn = document.createElement('div')
    sendInviteBtn.innerHTML =`Send Invite`
    sendInviteBtn.id = 'sendInviteBtn'
    sendInviteBtn.addEventListener('click', (ev) => {
        console.log(`send invite`)
    })
    
    parent.appendChild(sendInviteBtn)
}

