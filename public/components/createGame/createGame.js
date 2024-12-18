function renderCreateGame(parent) {
    parent.innerHTML = `
        <section id="createGameTitleContainer"></section>
        <section id="createGameInfoContainer"></section>
        <section id="createGameButtonContainer"></section>
    `

    renderTitle(document.querySelector('#createGameTitleContainer'))

}

function renderTitle(parent) {
    const title = document.createElement('div')
    title.innerHTML = `Create a new game!`
    title.id = 'newGameTitle'

    parent.appendChild(title)
}