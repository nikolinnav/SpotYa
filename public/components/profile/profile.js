function renderProfile(parent) {
    parent.innerHTML = `<main id="profile">
        <section id="pf-info"></section>
        <section id="pf-friends"></section>
        <section id="pf-friendrequests"></section>
    </main>`

    renderProfileInfo(document.querySelector('#pf-info'), 'Rudolf','Rudolf rödmule', '1008p', '')

    const grid = renderProfileFriends(document.querySelector('#pf-friends'))

    // TODO: Fetch users friends 
    // TODO: Skapa loop med resultatet från fetch!
    renderAvatar(grid, 'Lisa', '')
    renderAvatar(grid, 'Kalle', '')
    renderAvatar(grid, 'Linus', '')
    renderAvatar(grid, 'Ulla', '')
    renderAvatar(grid, 'Greta', '')

    addFriendsButton(grid) 

    renderFriendRequests(document.querySelector(`#pf-friendrequests`))
    renderRequestsAvatars(document.querySelector(`#pf-friendrequests`), 'Björne', '') // Not Björne ofc utan loopa alla freind requests
}



function renderProfileInfo (parent, nickname, name, score,  imgSrc) {
    console.log('jaaaaaa')

    const container = document.createElement('div')
    parent.appendChild(container)

    const div = document.createElement('div')
    const img = document.createElement('img')
    img.setAttribute('src', imgSrc)
    div.appendChild(img)

    container.appendChild(div)

    const pUsername = document.createElement('p')
    pUsername.appendChild(document.createTextNode(nickname))
    parent.appendChild(pUsername)
    
    const pName = document.createElement('p')
    pName.appendChild(document.createTextNode(name))
    parent.appendChild(pName)

    const pill = document.createElement('div')
    const points = document.createElement('p')
    points.appendChild(document.createTextNode(score))
    pill.setAttribute('id', 'pillId');
    pill.appendChild(points)
    parent.appendChild(pill)

    const a = document.createElement('a')
    // a.appendChild(document.createTextNode('x'))
    a.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.1593 10.98C17.1993 10.66 17.2293 10.34 17.2293 10C17.2293 9.66003 17.1993 9.34003 17.1593 9.02003L19.2693 7.37003C19.4593 7.22003 19.5093 6.95003 19.3893 6.73003L17.3893 3.27003C17.3304 3.16685 17.2366 3.08804 17.1248 3.04773C17.0131 3.00742 16.8906 3.00823 16.7793 3.05003L14.2893 4.05003C13.7693 3.65003 13.2093 3.32003 12.5993 3.07003L12.2193 0.420026C12.2024 0.302545 12.1434 0.195211 12.0532 0.117964C11.9631 0.0407173 11.848 -0.00119078 11.7293 2.57606e-05H7.72933C7.47933 2.57606e-05 7.26933 0.180026 7.23933 0.420026L6.85933 3.07003C6.24933 3.32003 5.68933 3.66003 5.16933 4.05003L2.67933 3.05003C2.62121 3.03091 2.56051 3.02079 2.49933 3.02003C2.32933 3.02003 2.15933 3.11003 2.06933 3.27003L0.0693316 6.73003C-0.0606684 6.95003 -0.000668302 7.22003 0.189332 7.37003L2.29933 9.02003C2.25933 9.34003 2.22933 9.67003 2.22933 10C2.22933 10.33 2.25933 10.66 2.29933 10.98L0.189332 12.63C-0.000668302 12.78 -0.0506684 13.05 0.0693316 13.27L2.06933 16.73C2.12828 16.8332 2.22205 16.912 2.33383 16.9523C2.44561 16.9926 2.5681 16.9918 2.67933 16.95L5.16933 15.95C5.68933 16.35 6.24933 16.68 6.85933 16.93L7.23933 19.58C7.26933 19.82 7.47933 20 7.72933 20H11.7293C11.9793 20 12.1893 19.82 12.2193 19.58L12.5993 16.93C13.2093 16.68 13.7693 16.34 14.2893 15.95L16.7793 16.95C16.8393 16.97 16.8993 16.98 16.9593 16.98C17.1293 16.98 17.2993 16.89 17.3893 16.73L19.3893 13.27C19.5093 13.05 19.4593 12.78 19.2693 12.63L17.1593 10.98ZM15.1793 9.27003C15.2193 9.58003 15.2293 9.79003 15.2293 10C15.2293 10.21 15.2093 10.43 15.1793 10.73L15.0393 11.86L15.9293 12.56L17.0093 13.4L16.3093 14.61L15.0393 14.1L13.9993 13.68L13.0993 14.36C12.6693 14.68 12.2593 14.92 11.8493 15.09L10.7893 15.52L10.6293 16.65L10.4293 18H9.02933L8.83933 16.65L8.67933 15.52L7.61933 15.09C7.18933 14.91 6.78933 14.68 6.38933 14.38L5.47933 13.68L4.41933 14.11L3.14933 14.62L2.44933 13.41L3.52933 12.57L4.41933 11.87L4.27933 10.74C4.24933 10.43 4.22933 10.2 4.22933 10C4.22933 9.80003 4.24933 9.57003 4.27933 9.27003L4.41933 8.14003L3.52933 7.44003L2.44933 6.60003L3.14933 5.39003L4.41933 5.90003L5.45933 6.32003L6.35933 5.64003C6.78933 5.32003 7.19933 5.08003 7.60933 4.91003L8.66933 4.48003L8.82933 3.35003L9.02933 2.00003H10.4193L10.6093 3.35003L10.7693 4.48003L11.8293 4.91003C12.2593 5.09003 12.6593 5.32003 13.0593 5.62003L13.9693 6.32003L15.0293 5.89003L16.2993 5.38003L16.9993 6.59003L15.9293 7.44003L15.0393 8.14003L15.1793 9.27003ZM9.72933 6.00003C7.51933 6.00003 5.72933 7.79003 5.72933 10C5.72933 12.21 7.51933 14 9.72933 14C11.9393 14 13.7293 12.21 13.7293 10C13.7293 7.79003 11.9393 6.00003 9.72933 6.00003ZM9.72933 12C8.62933 12 7.72933 11.1 7.72933 10C7.72933 8.90003 8.62933 8.00003 9.72933 8.00003C10.8293 8.00003 11.7293 8.90003 11.7293 10C11.7293 11.1 10.8293 12 9.72933 12Z" fill="#B9B9B9"/>
    </svg>`
    a.addEventListener('click', (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        console.log(`edit profile`)
        // till ny vy, inställnigar för att redigera profil
    })

    container.appendChild(a)
}



function renderProfileFriends(parent) {
    const title = document.createElement('div')
    title.className = 'pf-title'
    title.appendChild(document.createTextNode('Friends'))
    parent.appendChild(title)

    const grid = document.createElement('div')
    grid.className = 'avatar-grid'
    parent.appendChild(grid)

    const containerViewMore = document.createElement('div')
    containerViewMore.className = `containerViewMore`
    const viewMore = document.createElement('div')
    viewMore.className = 'viewMoreButton'
    viewMore.addEventListener('click', (ev) => {
        console.log(`show all friends`)
        // vid cancelIdleCallback, expandera och visa alla vänner
    })

    const text = document.createElement('p')
    text.innerHTML = `View more <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M3 4H0V3H3V0H4V3H7V4H4V7H3V4Z" fill="white"/>
      </svg>`
   
    viewMore.appendChild(text)
    containerViewMore.appendChild(viewMore)
    parent.appendChild(containerViewMore)

    return grid
  
}



function renderAvatar(parent, name, imgSrc) {
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
</svg>
`
    a.addEventListener('click', (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        console.log(`ta bort ${name}`)
        // implement delete friend here
    })

    container.appendChild(div)
    container.appendChild(p)
    container.appendChild(a)

    parent.appendChild(container)
}


function addFriendsButton(parent) {
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
        console.log(`Till vy för searchFriends`)
        renderSearchPlayers(document.querySelector("#wrapper"))
    })

    parent.appendChild(container)
    container.appendChild(div)
    div.appendChild(plus)
}




function renderFriendRequests(parent) {
    const title = document.createElement('div')
    title.className = 'pf-title'
    title.appendChild(document.createTextNode('Friend requests'))
    parent.appendChild(title)
}

function renderRequestsAvatars(parent, name, imgSrc) {
    const containerBig = document.createElement('div')
    containerBig.className = 'requestAvatarContainer'

    const containerL = document.createElement('div')

    const div = document.createElement('div')
    const img = document.createElement('img')
    img.setAttribute('src', imgSrc)
    div.appendChild(img)

    const p = document.createElement('p')
    p.appendChild(document.createTextNode(name))


    const containerR = document.createElement('div')
    containerR.className = 'answerContainer'
   
    const remove = document.createElement('div')
    remove.appendChild(document.createTextNode('Remove'))
    remove.classList = 'remove'
    remove.addEventListener('click', (ev) => {
        console.log(`Remove`)
        //Remove friend request
    })
  
    const approve = document.createElement('div')
    approve.appendChild(document.createTextNode('Approve'))
    approve.classList = 'approve'
    approve.addEventListener('click', (ev) => {
        console.log(`Approve`)
        //Approve friend request and add to friends ??? Huuurr :)
    })


    containerL.appendChild(div)
    containerL.appendChild(p)
    containerBig.appendChild(containerL)
    parent.appendChild(containerBig)

    containerR.appendChild(remove)
    containerR.appendChild(approve)
    containerBig.appendChild(containerR)

}
