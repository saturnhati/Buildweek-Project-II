async function displayArtistPage() {
    let apiArtist = await fetch('https://striveschool-api.herokuapp.com/api/deezer/artist/415')
    let apiArtistSongs = await fetch('https://striveschool-api.herokuapp.com/api/deezer/artist/415/top?limit=100')
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
}


window.onload = () => {
    displayArtistPage()
}