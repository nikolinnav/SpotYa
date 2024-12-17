function renderSearchPlayers(parent) {
    parent.innerHTML = `
    <section id="searchPlayers">
    </section>
    <section id="showPlayersList">
    </section>
    `

    searchFieldPlayers(document.querySelector('#searchPlayers'))
}


function searchFieldPlayers(parent) {

    const searchIcon = document.createElement('div')
    searchIcon.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.2268 11.2268C11.7831 10.6705 12.2243 10.0101 12.5254 9.28325C12.8265 8.55643 12.9814 7.77742 12.9814 6.99071C12.9814 6.204 12.8265 5.42499 12.5254 4.69816C12.2243 3.97134 11.7831 3.31093 11.2268 2.75464C10.6705 2.19835 10.0101 1.75708 9.28325 1.45602C8.55643 1.15495 7.77742 1 6.99071 1C6.204 1 5.42499 1.15495 4.69816 1.45602C3.97134 1.75708 3.31093 2.19835 2.75464 2.75464C1.63116 3.87811 1 5.40187 1 6.99071C1 8.57954 1.63116 10.1033 2.75464 11.2268C3.87811 12.3503 5.40187 12.9814 6.99071 12.9814C8.57954 12.9814 10.1033 12.3503 11.2268 11.2268ZM11.2268 11.2268L15 15" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
    searchIcon.className = 'searchIcon'

    const inputEl = document.createElement('input')
    inputEl.id = 'searchField'
    inputEl.placeholder = 'Search for other players';

    inputEl.addEventListener('keydown', (event) => {
    console.log(event.target.value)
    })

    const mainEl = document.createElement('div')
    mainEl.id = 'searchPlayers'

    const resetInputField = document.createElement('div')
    resetInputField.className = 'resetInputField'
    resetInputField.innerHTML = `<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.10526 0.180458C0.984012 0.063356 0.821625 -0.0014404 0.65307 2.43017e-05C0.484515 0.001489 0.323279 0.0690976 0.204088 0.188289C0.0848967 0.307479 0.0172881 0.468716 0.0158234 0.637271C0.0143587 0.805826 0.0791551 0.968213 0.196257 1.08946L3.5989 4.4921L0.196257 7.89474C0.134857 7.95404 0.085883 8.02498 0.0521915 8.10341C0.0185 8.18184 0.000766011 8.2662 2.42722e-05 8.35156C-0.000717467 8.43691 0.0155479 8.52157 0.0478713 8.60057C0.0801948 8.67957 0.127929 8.75135 0.188289 8.81171C0.248648 8.87207 0.320424 8.9198 0.399429 8.95213C0.478434 8.98445 0.563085 9.00072 0.648443 8.99998C0.733801 8.99923 0.818157 8.9815 0.896588 8.94781C0.975019 8.91412 1.04596 8.86514 1.10526 8.80374L4.5079 5.4011L7.91054 8.80374C8.03179 8.92084 8.19417 8.98564 8.36273 8.98418C8.53128 8.98271 8.69252 8.9151 8.81171 8.79591C8.9309 8.67672 8.99851 8.51548 8.99998 8.34693C9.00144 8.17837 8.93664 8.01599 8.81954 7.89474L5.4169 4.4921L8.81954 1.08946C8.93664 0.968213 9.00144 0.805826 8.99998 0.637271C8.99851 0.468716 8.9309 0.307479 8.81171 0.188289C8.69252 0.0690976 8.53128 0.001489 8.36273 2.43017e-05C8.19417 -0.0014404 8.03179 0.063356 7.91054 0.180458L4.5079 3.5831L1.10526 0.180458Z" fill="#242424"/>
    </svg>`
    resetInputField.style.display = 'none'; // Dölj knappen från start

    inputEl.addEventListener('input', () => {
        if (inputEl.value.length > 0) {
            resetInputField.style.display = 'block';
        } else {
            resetInputField.style.display = 'none';
        }
    })

    resetInputField.addEventListener('click', () => {
        inputEl.value = '';
        resetInputField.style.display = 'none';
        inputEl.focus();
    })


    parent.appendChild(searchIcon)
    mainEl.appendChild(inputEl)
    parent.appendChild(mainEl)
    parent.appendChild(resetInputField)
}