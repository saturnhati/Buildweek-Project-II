// FETCH FEATURED ALBUM

async function getAlbum() {
    let httpResponse = await fetch('https://striveschool-api.herokuapp.com/api/deezer/album/351619137')
    let json = await httpResponse.json()
    let albumCover = json.cover
    let albumArtist = json.artist
    let albumTitle = json.title
    console.log(albumCover)
    displayCover(albumCover, albumArtist, albumTitle)
}

function displayCover(albumCover, albumArtist, albumTitle) {
    let cover = document.querySelector('#hero-image')
    let heroTitle = document.querySelector('#hero-title')
    let heroArtist = document.querySelector('#hero-artist')
    cover.srcset = albumCover
    heroTitle.innerHTML = albumTitle
    heroArtist.innerHTML = albumArtist.name
}

// FETCH ALBUMS HOMEPAGE

let arrayAlbums = ['361734707', '300098017', '351619137', '42378011', '228257312', '1346746', '1236002', '130876272']

async function getAlbums() {
    for (let album of arrayAlbums) {
        let httpResponse = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${album}`)
        let albumJson = await httpResponse.json()
        let cover = albumJson.cover_medium
        let title = albumJson.title
        let artist = albumJson.artist
        // creo la card totale
        let albumCard = document.createElement('div')
        albumCard.classList.add('album-card')
        // creo l'immagine
        let albumCover = document.createElement('img')
        albumCover.srcset = cover
        // creo il titolo
        let albumTitle = document.createElement('a')
        albumTitle.setAttribute('href', `http://localhost:5500/album-page.html?id=${album}`)
        albumTitle.innerHTML = title
        // creo il nome artista
        let albumArtist = document.createElement('a')
        albumArtist.setAttribute('href', `http://localhost:5500/artist-page.html?id=${artist.id}`)
        albumArtist.innerHTML = artist.name
        // attacco il vari pezzi alla card totale
        albumCard.appendChild(albumCover)
        albumCard.appendChild(albumTitle)
        albumCard.appendChild(albumArtist)
        // attacco la card al container
        let container = document.querySelector('.recent-album')
        container.appendChild(albumCard)
    }

}


//             <div class="album-card">
//               <img src="./assets/img/rotation.png" />
//               <h3>A rotazione</h3>
//               <h4>artista</h4>
//             </div>



// Funzione per il menu dropdown
function openDropdown() {
    let dropdown = document.querySelector('#dropdown-menu')
    let icondown = document.querySelector('.fa-caret-down')
    let iconup = document.querySelector('.fa-caret-up')
    dropdown.classList.toggle('visible')
    icondown.classList.toggle('invisible-icon')
    iconup.classList.toggle('invisible-icon')
}

window.onload = () => {
    getAlbum()
    getAlbums()
}