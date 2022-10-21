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
        let artistId = albumJson.artist.id
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
        albumArtist.setAttribute('href', `http://localhost:5500/artist-page.html?id=${artistId}`)
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
    coverListening.srcset = cover.cover_medium
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

// Funzione volume
document.addEventListener("DOMContentLoaded", () => {
    const range = document.querySelector(".volume input[type=range]");

    const barHoverBox = document.querySelector(".volume .bar-hoverbox");
    const fill = document.querySelector(".volume .bar .bar-fill");

    range.addEventListener("change", (e) => {
        let number = e.target.value / 100
        player.volume = number
    });

    const setValue = (value) => {
        fill.style.width = value + "%";
        range.setAttribute("value", value)
        range.dispatchEvent(new Event("change"))
    }

    setValue(range.value);

    const calculateFill = (e) => {
        let offsetX = e.offsetX

        if (e.type === "touchmove") {
            offsetX = e.touches[0].pageX - e.touches[0].target.offsetLeft
        }

        const width = e.target.offsetWidth - 30;

        setValue(
            Math.max(
                Math.min(
                    (offsetX - 15) / width * 100.0,
                    100.0
                ),
                0
            )
        );
    }

    let barStillDown = false;

    barHoverBox.addEventListener("touchstart", (e) => {
        barStillDown = true;
        calculateFill(e);
    }, true);

    barHoverBox.addEventListener("touchmove", (e) => {
        if (barStillDown) {
            calculateFill(e);
        }
    }, true);

    barHoverBox.addEventListener("mousedown", (e) => {
        barStillDown = true;
        calculateFill(e);
    }, true);

    barHoverBox.addEventListener("mousemove", (e) => {
        if (barStillDown) {
            calculateFill(e);
        }
    });

    barHoverBox.addEventListener("wheel", (e) => {
        const newValue = +range.value + e.deltaY * 0.5;

        setValue(Math.max(
            Math.min(
                newValue,// Funzione volume
                document.addEventListener("DOMContentLoaded", () => {
                    const range = document.querySelector(".volume input[type=range]");

                    const barHoverBox = document.querySelector(".volume .bar-hoverbox");
                    const fill = document.querySelector(".volume .bar .bar-fill");

                    range.addEventListener("change", (e) => {
                        let number = e.target.value / 100
                        player.volume = number
                    });

                    const setValue = (value) => {
                        fill.style.width = value + "%";
                        range.setAttribute("value", value)
                        range.dispatchEvent(new Event("change"))
                    }

                    setValue(range.value);

                    const calculateFill = (e) => {
                        let offsetX = e.offsetX

                        if (e.type === "touchmove") {
                            offsetX = e.touches[0].pageX - e.touches[0].target.offsetLeft
                        }

                        const width = e.target.offsetWidth - 30;

                        setValue(
                            Math.max(
                                Math.min(
                                    (offsetX - 15) / width * 100.0,
                                    100.0
                                ),
                                0
                            )
                        );
                    }

                    let barStillDown = false;

                    barHoverBox.addEventListener("touchstart", (e) => {
                        barStillDown = true;
                        calculateFill(e);
                    }, true);

                    barHoverBox.addEventListener("touchmove", (e) => {
                        if (barStillDown) {
                            calculateFill(e);
                        }
                    }, true);

                    barHoverBox.addEventListener("mousedown", (e) => {
                        barStillDown = true;
                        calculateFill(e);
                    }, true);

                    barHoverBox.addEventListener("mousemove", (e) => {
                        if (barStillDown) {
                            calculateFill(e);
                        }
                    });

                    barHoverBox.addEventListener("wheel", (e) => {
                        const newValue = +range.value + e.deltaY * 0.5;

                        setValue(Math.max(
                            Math.min(
                                newValue,
                                100.0
                            ),
                            0
                        ))
                    });

                    document.addEventListener("mouseup", (e) => {
                        barStillDown = false;
                    }, true);

                    document.addEventListener("touchend", (e) => {
                        barStillDown = false;
                    }, true);
                }),
                100.0
            ),
            0
        ))
    });

    document.addEventListener("mouseup", (e) => {
        barStillDown = false;
    }, true);

    document.addEventListener("touchend", (e) => {
        barStillDown = false;
    }, true);
})

// Funzioni richiamate onload
window.onload = () => {
    getAlbum()
    getAlbums()
}