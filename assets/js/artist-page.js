async function displayArtistPage() {
    let queryString = new URLSearchParams(window.location.search)
    let id = queryString.get('id')
    let apiArtist = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${id}`)
    let apiArtistSongs = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=50`)
    // Creo l'oggetto da apiArtist
    let objectArtist = await apiArtist.json()
    // Creo l'oggetto da apiArtistSong
    let objectArtistSongs = await apiArtistSongs.json()
    let arrayArtistSongs = objectArtistSongs.data
    document.querySelector('h1').innerHTML = objectArtist.name
    document.querySelector('.artist-hero p').innerHTML = `${objectArtist.nb_fan} ascoltatori mensili`
    for (const arrayArtistSong of arrayArtistSongs) {
        document.getElementById('artist-list-songs').innerHTML += `<li>
        <div class="artist-imgtitle">
          <img src=${arrayArtistSong.album.cover_small} alt="" />
          <span id="artist-song">${arrayArtistSong.title}</span>
        </div>
        <span id="artist-followers">${arrayArtistSong.rank}</span><span id="artist-time">${arrayArtistSong.duration}</span>
      </li>`
    }
    document.querySelector('.artist-likers p').innerHTML = `di ${objectArtist.name}`
    document.querySelector('.artist-like img').src = objectArtist.picture_medium
}


window.onload = () => {
    displayArtistPage()
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