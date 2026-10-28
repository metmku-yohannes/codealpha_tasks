const playlist = [
  {
    title: "Fiyorina",
    artist: "Teddy Afro",
    src: "music/fiyorina.m4a",
    image: "fiyorina-cover.png"
  },
  {
    title: "Yane Leje Eyalen",
    artist: "Gosaye Tesfay",
    src: "music/yane-leje-eyalen.m4a",
    image: "yane-leje-eyalen-cover.png"
  },
  {
    title: "Kefitret Yegilish",
    artist: "Tadele Roba",
    src: "music/kefitret-yegilish.m4a",
    image: "kefitret-yegilish-cover.png"
  }
];

let currentSongIndex = 0;

const song = new Audio();
const playPauseButton = document.getElementById("play-pause")

const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");

const albumCover = document.getElementById("album-cover");

const searchInput = document.getElementById("search-input");

const noResults = document.getElementById("no-results");

const timeline = document.getElementById("timeline");
const volumeSlider = document.getElementById("volume");

const currentTimeDisplay = document.getElementById("current-time");
const durationDisplay = document.getElementById("duration");

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return minutes + ":" + String(remainingSeconds).padStart(2, "0");
}

function loadSong() {
  song.src = playlist[currentSongIndex].src;
  song.currentTime = 0;
  timeline.value = 0;
  currentTimeDisplay.textContent = "0:00";

  songTitle.textContent = playlist[currentSongIndex].title;
  songArtist.textContent = playlist[currentSongIndex].artist;
  albumCover.src = playlist[currentSongIndex].image;

  playPauseButton.textContent = "▶";
}

playPauseButton.addEventListener("click", function () {
  if (playPauseButton.textContent === "▶") {
    song.play();
    playPauseButton.textContent = "⏸";
  } else {
    song.pause();
    playPauseButton.textContent = "▶";
  }
});

loadSong();

highlightCurrentSong();

const nextButton = document.getElementById("next");

nextButton.addEventListener("click", function () {
  const wasPlaying = !song.paused;

  if (currentSongIndex < playlist.length - 1) {
    currentSongIndex++;
  } else {
    currentSongIndex = 0;
  }

  loadSong();

  highlightCurrentSong();

  if (wasPlaying) {
    song.play();
    playPauseButton.textContent = "⏸";
  }
});

const previousButton = document.getElementById("previous");

previousButton.addEventListener("click", function () {
  const wasPlaying = !song.paused;

  if (currentSongIndex > 0) {
    currentSongIndex--;
  } else {
    currentSongIndex = playlist.length - 1;
  }

  loadSong();

  highlightCurrentSong();

  if (wasPlaying) {
    song.play();
    playPauseButton.textContent = "⏸";
  }
});

function highlightCurrentSong() {
  const songRows = document.querySelectorAll(".song-row");

  songRows.forEach(function (row, index) {
    if (index === currentSongIndex) {
      row.classList.add("active-song");
    } else {
      row.classList.remove("active-song");
    }
  });
}

const playlistButtons = document.querySelectorAll(".play-button");

playlistButtons.forEach(function (button, index) {
  button.addEventListener("click", function () {
    currentSongIndex = index;
    loadSong();
    highlightCurrentSong();
    song.play();
    playPauseButton.textContent = "⏸";
  });
});

song.addEventListener("loadedmetadata", function () {
  timeline.max = song.duration;
  durationDisplay.textContent = formatTime(song.duration);
});

song.addEventListener("timeupdate", function () {
  timeline.value = song.currentTime;
  currentTimeDisplay.textContent = formatTime(song.currentTime);
});

timeline.addEventListener("input", function () {
  song.currentTime = timeline.value;
});

volumeSlider.addEventListener("input", function () {
  song.volume = volumeSlider.value;
});

song.addEventListener("ended", function () {
  if (currentSongIndex < playlist.length - 1) {
    currentSongIndex++;
    loadSong();
    highlightCurrentSong();
    song.play();
    playPauseButton.textContent = "⏸";
  } else {
    playPauseButton.textContent = "▶";
    timeline.value = 0;
    currentTimeDisplay.textContent = "0:00";
  }
});

searchInput.addEventListener("input", function () {
  const searchText = searchInput.value.toLowerCase().trim();

  const songRows = document.querySelectorAll(".song-row");

  songRows.forEach(function (row, index) {
    const title = playlist[index].title.toLowerCase();
    const artist = playlist[index].artist.toLowerCase();

    if (title.includes(searchText) || artist.includes(searchText)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });

  const visibleSongs = Array.from(songRows).filter(function (row) {
    return row.style.display !== "none";
  });

  if (visibleSongs.length === 0) {
    noResults.style.display = "";
  } else {
    noResults.style.display = "none";
  }
});