let queryString = new URLSearchParams(window.location.search);
let id = queryString.get("id");

async function getAlbum() {
  let httpResponse = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/album/${id}`
  );
  let json = await httpResponse.json();
  let albumCover = json.cover_medium;
  let albumArtist = json.artist;
  let albumTitle = json.title;
  let albumRelease = json.release_date;
  let albumTracks = json.nb_tracks;
  let tracksArray = json.tracks.data;
  console.log(albumCover);
  console.log(tracksArray);
  console.log(tracksArray.title);
  console.log(tracksArray.indexOf(tracksArray[0]));
  displayCover(albumCover, albumArtist, albumTitle, albumRelease, albumTracks);
  displayTracks(tracksArray, albumArtist, albumCover);
}

function displayCover(
  albumCover,
  albumArtist,
  albumTitle,
  albumRelease,
  albumTracks
) {
  let cover = document.querySelector("#hero-image-album");
  let heroTitle = document.querySelector("#hero-title-album");
  let heroArtist = document.querySelector("#hero-artist-album");
  let miniArtistImage = document.querySelector("#mini-artist-image");
  cover.srcset = albumCover;
  heroTitle.innerHTML = albumTitle;

  heroArtist.innerHTML = `<a href="http://localhost:5500/artist-page.html?id=${
    albumArtist.id
  }">${albumArtist.name}</a> - ${albumRelease.slice(
    -10,
    4
  )} - ${albumTracks} brani`;
  miniArtistImage.srcset = albumArtist.picture_small;
}

//Funzione per prendere più album
async function getArtistAlbums() {
  //Fetch sull'album
  let pageAlbum = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/album/${id}`
  );
  let jsonPageAlbum = await pageAlbum.json();
  console.log(jsonPageAlbum.artist.id);
  // Fetch sulla tracklist
  let moreAlbumArtist = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/artist/${jsonPageAlbum.artist.id}/top?limit=4`
  );
  let jsonMoreArtist = await moreAlbumArtist.json();
  console.log(jsonMoreArtist);
  console.log(jsonMoreArtist.data[0].album);
  //Prendo i dati da inserire nell'html
  document.querySelector(
    ".main-content-album"
  ).innerHTML += `<h2>Altro di ${jsonMoreArtist.data[0].artist.name}</h2>
          <div id="more-albums"></div>`;

  for (i = 0; i < jsonMoreArtist.data.length; i++) {
    document.getElementById(
      "more-albums"
    ).innerHTML += `<div class="more-album-card"><img src=${jsonMoreArtist.data[i].album.cover_medium} /><h3>${jsonMoreArtist.data[i].album.title}</h3></div>`;
  }
}

//Funzione per visualizzare le tracce
function displayTracks(tracksArray, albumArtist, albumCover) {
  //Prendo il container
  let container = document.querySelector("#album-tracks");
  //for (i = 0; i < tracksArray.length; i++)
  for (let track of tracksArray) {
    //Creo il div con classe track-player
    let trackPlayerDiv = document.createElement("div");
    trackPlayerDiv.classList.add("track-player");
    //Creo il div che contiene numero e bottone, titolo, nome artista
    let numberTitleDiv = document.createElement("div");
    numberTitleDiv.classList.add("number-title");
    trackPlayerDiv.appendChild(numberTitleDiv);
    //Creo il div con numero e bottone
    let songNumberDiv = document.createElement("div");
    songNumberDiv.classList.add("song-number");
    //Ci metto il numero
    songNumberDiv.innerHTML += tracksArray.indexOf(track) + 1;
    //Creo il bottone
    let buttonSongPlay = document.createElement("button");
    buttonSongPlay.setAttribute("type", "button");
    buttonSongPlay.classList.add("button-artist-song");
    //QUI ANDRA' L'EVENT LISTENER
    buttonSongPlay.addEventListener("click", () => {
      playAudio(albumCover, albumArtist.name, track.title, track.preview);
    });
    //Creo l'icona
    let icon = document.createElement("i");
    icon.classList.add("fa-solid");
    icon.classList.add("fa-play");
    //Inserisco l'icona nel bottone
    buttonSongPlay.appendChild(icon);
    //Inserisco il bottone nel div
    songNumberDiv.appendChild(buttonSongPlay);
    //Inserisco numero e bottone nel numberTitleDiv
    numberTitleDiv.appendChild(songNumberDiv);
    //Creo il div per titolo e artista
    let songArtistDiv = document.createElement("div");
    songArtistDiv.classList.add("song-artist");
    numberTitleDiv.appendChild(songArtistDiv);
    //Creo il div per il titolo e ci metto il titolo di ogni canzone
    let titleDiv = document.createElement("div");
    titleDiv.classList.add("title");
    titleDiv.innerHTML += track.title;
    songArtistDiv.appendChild(titleDiv);
    //Creo il div per l'artista e ci metto il nome
    let artistNameDiv = document.createElement("div");
    artistNameDiv.classList.add("artist");
    artistNameDiv.innerHTML = albumArtist.name;
    songArtistDiv.appendChild(artistNameDiv);
    //Creo il div per il numero di ripetizioni
    let playSongDiv = document.createElement("div");
    playSongDiv.classList.add("play-song");
    playSongDiv.innerHTML += track.rank;
    trackPlayerDiv.appendChild(playSongDiv);
    //Creo il div per la durata
    let durationSongDiv = document.createElement("div");
    durationSongDiv.classList.add("duration-song");
    durationSongDiv.innerHTML += Math.round(track.duration / 60);
    trackPlayerDiv.appendChild(durationSongDiv);

    //Inserisco tutto nel container
    container.appendChild(trackPlayerDiv);
  }
}

window.onload = () => {
  getAlbum();
  getArtistAlbums();
};
// Funzione per il menu dropdown
function openDropdown() {
  let dropdown = document.querySelector("#dropdown-menu");
  let icondown = document.querySelector(".fa-caret-down");
  let iconup = document.querySelector(".fa-caret-up");
  dropdown.classList.toggle("visible");
  icondown.classList.toggle("invisible-icon");
  iconup.classList.toggle("invisible-icon");
}

// Funzione per l'audio tag
let player = document.querySelector("audio");
let seekbar = document.querySelector("#seekbar");
let playIcon = document.querySelector(".fa-circle-play");
let pauseIcon = document.querySelector(".fa-circle-pause");
let titleListening = document.querySelector("#title-listening");
let artistListening = document.querySelector("#artist-listening");
let coverListening = document.querySelector("#cover-listening");
let iconListening = document.querySelector("#icon-listening");
let progressBar = document.querySelector("#audio-progress");
let progressValue = progressBar.value;
let interval;
let intervalProgress;
let timer = document.querySelector("#current-time");

function playAudio(cover, artist, title, preview) {
  playIcon.classList.add("icon-invisible");
  pauseIcon.classList.remove("icon-invisible");
  player.src = preview;
  player.play();
  coverListening.srcset = cover;
  titleListening.innerHTML = title;
  artistListening.innerHTML = artist;
  iconListening.classList.remove("icon-listening-none");
  progressValue = 0;
  startProgress();
  startTimer();
}

function startTimer() {
  let s = 1;
  interval = setInterval(function () {
    if (s < 10) {
      timer.innerHTML = `0:0${s}`;
    } else {
      timer.innerHTML = `0:${s}`;
    }
    s++;
  }, 1000);
}

function pauseAudio() {
  playIcon.classList.remove("icon-invisible");
  pauseIcon.classList.add("icon-invisible");
  player.pause();
  clearInterval(intervalProgress);
  clearInterval(interval);
}

function startProgress() {
  intervalProgress = setInterval(() => {
    progressValue++;
    progressBar.setAttribute("value", progressValue);
  }, 1000);
}
