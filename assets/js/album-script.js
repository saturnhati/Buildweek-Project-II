async function getAlbum() {
  let queryString = new URLSearchParams(window.location.search);
  let id = queryString.get("id");

  let httpResponse = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/album/${id}`
  );
  let json = await httpResponse.json();
  let albumCover = json.cover;
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
  heroArtist.innerHTML = `${albumArtist.name} - ${albumRelease.slice(
    -10,
    4
  )} - ${albumTracks} brani`;
  miniArtistImage.srcset = albumArtist.picture_small;
}

async function getMoreAlbums() {
  let withoutYouAlbum = await fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/album/352412657"
  );
  let withoutJson = await withoutYouAlbum.json();
  let withoutCover = withoutJson.cover;
  let withoutTitle = withoutJson.title;
  let withoutRelease = withoutJson.release_date;

  document.getElementById(
    "more-albums"
  ).innerHTML += `<div class="more-album-card"><img src=${withoutCover} /><h3>${withoutTitle}</h3><h4>${withoutRelease.slice(
    -10,
    4
  )}</h4></div>`;

  let placeDreamAlbum = await fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/album/14229250"
  );
  let placeDreamJson = await placeDreamAlbum.json();
  let placeDreamCover = placeDreamJson.cover;
  let placeDreamTitle = placeDreamJson.title;
  let placeDreamRelease = placeDreamJson.release_date;

  document.getElementById(
    "more-albums"
  ).innerHTML += `<div class="more-album-card"><img src=${placeDreamCover} /><h3>${placeDreamTitle}</h3><h4>${placeDreamRelease.slice(
    -10,
    4
  )}</h4></div>`;

  let soundtrackAlbum = await fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/album/248165312"
  );
  let soundtrackJson = await soundtrackAlbum.json();
  let soundtrackCover = soundtrackJson.cover;
  let soundtrackTitle = soundtrackJson.title;
  let soundtrackRelease = soundtrackJson.release_date;

  document.getElementById(
    "more-albums"
  ).innerHTML += `<div class="more-album-card"><img src=${soundtrackCover} /><h3>${soundtrackTitle}</h3><h4>${soundtrackRelease.slice(
    -10,
    4
  )}</h4></div>`;

  let coversAlbum = await fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/album/352368357"
  );
  let coversJson = await coversAlbum.json();
  let coversCover = coversJson.cover;
  let coversTitle = coversJson.title;
  let coversRelease = coversJson.release_date;

  document.getElementById(
    "more-albums"
  ).innerHTML += `<div class="more-album-card"><img src=${coversCover} /><h3>${coversTitle}</h3><h4>${coversRelease.slice(
    -10,
    4
  )}</h4></div>`;
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

window.onload = () => {
  getAlbum();
  getMoreAlbums();
};
