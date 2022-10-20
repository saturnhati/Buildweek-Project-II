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
  displayTracks(tracksArray, albumArtist);
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

// async function getMoreAlbums() {
//   let withoutYouAlbum = await fetch(
//     "https://striveschool-api.herokuapp.com/api/deezer/album/352412657"
//   );
//   let withoutJson = await withoutYouAlbum.json();
//   let withoutCover = withoutJson.cover;
//   let withoutTitle = withoutJson.title;
//   let withoutRelease = withoutJson.release_date;

//   document.getElementById(
//     "more-albums"
//   ).innerHTML += `<div class="more-album-card"><img src=${withoutCover} /><h3>${withoutTitle}</h3><h4>${withoutRelease.slice(
//     -10,
//     4
//   )}</h4></div>`;

//   let placeDreamAlbum = await fetch(
//     "https://striveschool-api.herokuapp.com/api/deezer/album/14229250"
//   );
//   let placeDreamJson = await placeDreamAlbum.json();
//   let placeDreamCover = placeDreamJson.cover;
//   let placeDreamTitle = placeDreamJson.title;
//   let placeDreamRelease = placeDreamJson.release_date;

//   document.getElementById(
//     "more-albums"
//   ).innerHTML += `<div class="more-album-card"><img src=${placeDreamCover} /><h3>${placeDreamTitle}</h3><h4>${placeDreamRelease.slice(
//     -10,
//     4
//   )}</h4></div>`;

//   let soundtrackAlbum = await fetch(
//     "https://striveschool-api.herokuapp.com/api/deezer/album/248165312"
//   );
//   let soundtrackJson = await soundtrackAlbum.json();
//   let soundtrackCover = soundtrackJson.cover;
//   let soundtrackTitle = soundtrackJson.title;
//   let soundtrackRelease = soundtrackJson.release_date;

//   document.getElementById(
//     "more-albums"
//   ).innerHTML += `<div class="more-album-card"><img src=${soundtrackCover} /><h3>${soundtrackTitle}</h3><h4>${soundtrackRelease.slice(
//     -10,
//     4
//   )}</h4></div>`;

//   let coversAlbum = await fetch(
//     "https://striveschool-api.herokuapp.com/api/deezer/album/352368357"
//   );
//   let coversJson = await coversAlbum.json();
//   let coversCover = coversJson.cover;
//   let coversTitle = coversJson.title;
//   let coversRelease = coversJson.release_date;

//   document.getElementById(
//     "more-albums"
//   ).innerHTML += `<div class="more-album-card"><img src=${coversCover} /><h3>${coversTitle}</h3><h4>${coversRelease.slice(
//     -10,
//     4
//   )}</h4></div>`;
// }

async function getArtistAlbums() {
  let pageAlbum = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/album/${id}`
  );
  let jsonPageAlbum = await pageAlbum.json();
  console.log(jsonPageAlbum.artist.id);

  let moreAlbumArtist = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/artist/${jsonPageAlbum.artist.id}/top?limit=4`
  );
  let jsonMoreArtist = await moreAlbumArtist.json();
  console.log(jsonMoreArtist);
  console.log(jsonMoreArtist.data[0].album);

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

function displayTracks(tracksArray, albumArtist) {
  for (i = 0; i < tracksArray.length; i++) {
    document.querySelector(
      "#album-tracks"
    ).innerHTML += `<div class="track-player"><div id="number-title">
                <div id="song-number">${
                  tracksArray.indexOf(tracksArray[i]) + 1
                }</div>
                <div id="song-artist">
                  <div id="title">${tracksArray[i].title}</div>
                  <div id="artist">${albumArtist.name}</div>
                </div>
              </div>
              <div id="play-song">${tracksArray[i].rank}</div>
              <div id="duration-song">${Math.round(
                tracksArray[i].duration / 60
              )}</div></div>`;
  }
}

// Funzione per il menu dropdown
function openDropdown() {
  let dropdown = document.querySelector("#dropdown-menu");
  let icondown = document.querySelector(".fa-caret-down");
  let iconup = document.querySelector(".fa-caret-up");
  dropdown.classList.toggle("visible");
  icondown.classList.toggle("invisible-icon");
  iconup.classList.toggle("invisible-icon");
}

//observer per lo sticky element
// let stickyElement = document.querySelector(".track-player.track-player-header");
// const observer = new IntersectionObserver(([e]) =>
//   e.target.classList.add("sticky", e.intersectionRatio < 4.5)
// );

// observer.observe(stickyElement);

window.onload = () => {
  getAlbum();
  //getMoreAlbums();
  getArtistAlbums();
};
