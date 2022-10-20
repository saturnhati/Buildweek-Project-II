// Funzione per la ricerca
let searchBar = document.getElementById("search-bar");
searchBar.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
        console.log('PRESSED ENTER')
        startSearch();
    }
});

async function startSearch() {
    // prendo il valore dell'input e svuoto l'input e il container
    let input = searchBar.value
    searchBar.value = ''
    let container = document.querySelector('.main-content')
    container.innerHTML = ''
    let songs = document.querySelector('#songs')
    songs.innerHTML = 'Brani'
    let httpResponse = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${input}`)
    let response = await httpResponse.json()
    let results = response.data
    for (let result of results) {
        let cover = result.album.cover_medium
        let title = result.title
        let artistId = result.artist.id
        let artist = result.artist.name
        let playUrl = result.preview
        // creo la card totale
        let songCard = document.createElement('div')
        songCard.classList.add('album-card')
        // creo l'immagine
        let songCover = document.createElement('img')
        songCover.srcset = cover
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
            playAudio(cover, artist, result.title, playUrl)
        })
        // creo il titolo
        let songTitle = document.createElement('a')
        songTitle.setAttribute('href', `http://localhost:5500/album-page.html?id=${title}`)
        songTitle.innerHTML = title
        // creo il nome artista
        let songArtist = document.createElement('a')
        songArtist.setAttribute('href', `http://localhost:5500/artist-page.html?id=${artistId}`)
        songArtist.innerHTML = artist
        // attacco il vari pezzi alla card totale
        songCard.appendChild(songCover)
        songCard.appendChild(buttonPlay)
        songCard.appendChild(songTitle)
        songCard.appendChild(songArtist)
        // attacco la card al div brani
        container.appendChild(songCard)
    }
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
let progressBar = document.querySelector('#audio-progress')
let progressValue = progressBar.value
let interval
let intervalProgress
let timer = document.querySelector('#current-time')

function playAudio(cover, artist, previewTitle, playUrl) {
    playIcon.classList.add('icon-invisible')
    pauseIcon.classList.remove('icon-invisible')
    player.src = playUrl
    player.play();
    coverListening.srcset = cover
    titleListening.innerHTML = previewTitle
    artistListening.innerHTML = artist
    iconListening.classList.remove('icon-listening-none')
    progressValue = 0
    startProgress()
    startTimer()
}

function startTimer() {
    let s = 1
    interval = setInterval(function () {
        if (s < 10) {
            timer.innerHTML = `0:0${s}`
        }
        else {
            timer.innerHTML = `0:${s}`
        }
        s++;
    }, 1000);
}

function pauseAudio() {
    playIcon.classList.remove('icon-invisible')
    pauseIcon.classList.add('icon-invisible')
    player.pause();
    clearInterval(intervalProgress)
    clearInterval(interval);
}

function startProgress() {
    intervalProgress = setInterval(() => {
        progressValue++
        progressBar.setAttribute("value", progressValue)
    }, 1000);
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