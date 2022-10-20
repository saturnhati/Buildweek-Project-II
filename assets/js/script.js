// FETCH FEATURED ALBUM

async function getAlbum() {
    let httpResponse = await fetch('https://striveschool-api.herokuapp.com/api/deezer/album/351619137')
    let albumJson = await httpResponse.json()
    let cover = albumJson
    let title = albumJson.title
    let artist = albumJson.artist.name
    let playUrl = albumJson.tracks.data[0].preview
    let previewTitle = albumJson.tracks.data[0].title
    let buttonPlay = document.querySelector('#play-featured')
    buttonPlay.addEventListener('click', () => {
        let player = document.querySelector('audio')
        player.src = playUrl
        playAudio(cover, artist, previewTitle, playUrl)
    })
    displayCover(cover, artist, title)
}

function displayCover(cover, artist, title) {
    let albumCover = document.querySelector('#hero-image')
    let heroTitle = document.querySelector('#hero-title')
    let heroArtist = document.querySelector('#hero-artist')
    albumCover.srcset = cover.cover_big
    heroTitle.innerHTML = title
    heroArtist.innerHTML = artist
}

// FETCH ALBUMS HOMEPAGE

let arrayAlbums = ['361734707', '300098017', '351619137', '1262014', '228257312', '1346746', '1236002', '130876272']

async function getAlbums() {
    for (let album of arrayAlbums) {
        let httpResponse = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${album}`)
        let albumJson = await httpResponse.json()
        let cover = albumJson
        let title = albumJson.title
        let artist = albumJson.artist.name
        let playUrl = albumJson.tracks.data[0].preview
        let previewTitle = albumJson.tracks.data[0].title
        // creo la card totale
        let albumCard = document.createElement('div')
        albumCard.classList.add('album-card')
        // creo l'immagine
        let albumCover = document.createElement('img')
        albumCover.srcset = cover.cover_medium
        // creo il bottone
        let buttonPlay = document.createElement('button')
        // creo l'icona play
        let playIcon = document.createElement('i')
        playIcon.classList.add('fa-solid')
        playIcon.classList.add('fa-play')
        playIcon.setAttribute('id', 'playIcon')
        // inserisco l'icona play nel bottone
        buttonPlay.appendChild(playIcon)
        buttonPlay.classList.add('button-play')
        buttonPlay.addEventListener('click', () => {
            playAudio(cover, artist, previewTitle, playUrl)
        })
        // creo il titolo
        let albumTitle = document.createElement('a')
        albumTitle.setAttribute('href', `http://localhost:5500/album-page.html?id=${album}`)
        albumTitle.innerHTML = title
        // creo il nome artista
        let albumArtist = document.createElement('a')
        albumArtist.setAttribute('href', `http://localhost:5500/artist-page.html?id=${artist.id}`)
        albumArtist.innerHTML = artist
        // attacco il vari pezzi alla card totale
        albumCard.appendChild(albumCover)
        albumCard.appendChild(buttonPlay)
        albumCard.appendChild(albumTitle)
        albumCard.appendChild(albumArtist)
        // attacco la card al container
        let container = document.querySelector('.recent-album')
        container.appendChild(albumCard)
    }

}

// Funzione per il menu dropdown
function openDropdown() {
    let dropdown = document.querySelector('#dropdown-menu')
    let icondown = document.querySelector('.fa-caret-down')
    let iconup = document.querySelector('.fa-caret-up')
    dropdown.classList.toggle('visible')
    icondown.classList.toggle('invisible-icon')
    iconup.classList.toggle('invisible-icon')
}

// Funzione per l'audio tag
let player = document.querySelector('audio')
let seekbar = document.querySelector('#seekbar')
let playIcon = document.querySelector('.fa-circle-play')
let pauseIcon = document.querySelector('.fa-circle-pause')
let titleListening = document.querySelector('#title-listening')
let artistListening = document.querySelector('#artist-listening')
let coverListening = document.querySelector('#cover-listening')
let iconListening = document.querySelector('#icon-listening')

function playAudio(cover, artist, previewTitle, playUrl) {
    playIcon.classList.add('icon-invisible')
    pauseIcon.classList.remove('icon-invisible')
    player.src = playUrl
    player.play();
    coverListening.srcset = cover.cover_medium
    titleListening.innerHTML = previewTitle
    artistListening.innerHTML = artist
    iconListening.classList.remove('icon-listening-none')
}

function pauseAudio() {
    playIcon.classList.remove('icon-invisible')
    pauseIcon.classList.add('icon-invisible')
    player.pause();
}

// Funzioni richiamate onload
window.onload = () => {
    getAlbum()
    getAlbums()
}