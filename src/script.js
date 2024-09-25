'use strict'

async function fetchPlaylistData(playlistUrl) {
  const id = playlistUrl.split('/playlist/')[1]
  return await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
    "headers": {
      Authorization: "Bearer BQBQq6oqbJzmYWIugvoJDhKY6rtwlb2zgtR7wqvfoeHZ0phljaIqtOtKhNz697z_4XqMMJar12XTZtS2AfDU-F8vNMXrqyr9keC7r0-mnsPQpQ2R5IU",
    }
  })
}


document.addEventListener('DOMContentLoaded', function () {
  const rankButton = document.getElementById('rank-button');
  const compareArea = document.getElementById('song-comparasion')
  console.log(compareArea)


  rankButton.addEventListener('click', function () {
    const playlistUrl = document.getElementById('playlist-url').value;
    fetchPlaylistData(playlistUrl).then(data => data.json()).then(res => displayTracks(res))
  });


  const displayTracks = (playlistData) => {
    playlistData.tracks.items.map(item => compareArea.innerHTML = item.track.name)

  }

  function displayComparison(currentTrackIndex) {
    const trackA = currentPlaylist[currentTrackIndex];
    const trackB = currentPlaylist[(currentTrackIndex + 1) % currentPlaylist.length];

    const comparisonHtml = `
          <h3>Compare Songs:</h3>
          <p>A: ${trackA.track.name} by ${trackA.track.artists[0].name}</p>
          <p>B: ${trackB.track.name} by ${trackB.track.artists[0].name}</p>
          <button onclick="compareSongs(${currentTrackIndex})">A > B</button>
          <button onclick="compareSongs(${currentTrackIndex + 1})">B > A</button>
      `;
    resultDiv.innerHTML = comparisonHtml;
  }

  function compareSongs(index) {
    const trackA = currentPlaylist[index];
    const trackB = currentPlaylist[(index + 1) % currentPlaylist.length];

    const winner = prompt(`Which song do you prefer? ${trackA.track.name} by ${trackA.track.artists[0].name} or ${trackB.track.name} by ${trackB.track.artists[0].name}?`);

    if (winner === null || winner.toLowerCase() !== 'a') {
      swapTracks(trackA, trackB);
    }

    displayComparison(index);
    comparisonCount++;
  }

  function swapTracks(trackA, trackB) {
    const temp = currentPlaylist[currentPlaylist.indexOf(trackA)];
    currentPlaylist[currentPlaylist.indexOf(trackA)] = trackB;
    currentPlaylist[currentPlaylist.indexOf(trackB)] = temp;
  }

  function displayFinalRanking() {
    const rankingHtml = currentPlaylist.map((track, index) => `
          <div class="rank-item">
              <span>${index + 1}. ${track.track.name}</span>
              <span>by ${track.track.artists[0].name}</span>
          </div>
      `).join('');
    resultDiv.innerHTML = `<h3>Ranked Playlist:</h3>${rankingHtml}`;
  }

});