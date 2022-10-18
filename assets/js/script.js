async function getAlbum() {
    let httpResponse = await fetch('https://striveschool-api.herokuapp.com/api/deezer/album/351619137')
    let json = await httpResponse.json()
    let albumCover = json.cover
    let albumArtist = json.artist
    let albumTitle = json.title
    console.log(albumCover)
    displayCover(albumCover, albumArtist, albumTitle)
}

window.onload = () => {
    getAlbum()
}

function displayCover(albumCover, albumArtist, albumTitle) {
    let cover = document.querySelector('#hero-image')
    let heroTitle = document.querySelector('#hero-title')
    let heroArtist = document.querySelector('#hero-artist')
    cover.srcset = albumCover
    heroTitle.innerHTML = albumTitle
    heroArtist.innerHTML = albumArtist.name
}


// Funzione per il menu dropdown
function openDropdown() {
    let dropdown = document.querySelector('#dropdown-menu')
    let icondown = document.querySelector('.fa-caret-down')
    let iconup = document.querySelector('.fa-caret-up')
    dropdown.classList.toggle('visible')
    icondown.classList.toggle('visible-icon')
    iconup.classList.toggle('visible-icon')
}