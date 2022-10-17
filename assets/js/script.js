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