document.addEventListener('DOMContentLoaded', function () {
  const rankButton = document.getElementById('rank-button');
  const resultDiv = document.getElementById('result');

  let currentPlaylist = [];
  let comparisonCount = 0;

  rankButton.addEventListener('click', function () {
    const playlistUrl = document.getElementById('playlist-url').value;
    fetchPlaylistData(playlistUrl)
      .then(data => {
        currentPlaylist = data.tracks.items;
        displayInitialPlaylist(currentPlaylist);
      })
      .catch(error => {
        console.error('Error fetching playlist data:', error);
        resultDiv.textContent = 'An error occurred while fetching the playlist.';
      });
  });

  function displayInitialPlaylist(tracks) {
    const rankingHtml = tracks.map((track, index) => `
          <div class="rank-item">
              <span>${index + 1}. ${track.track.name}</span>
              <span>by ${track.track.artists[0].name}</span>
          </div>
      `).join('');
    resultDiv.innerHTML = `<h3>Initial Playlist:</h3>${rankingHtml}`;
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

  rankButton.addEventListener('click', function () {
    const playlistUrl = document.getElementById('playlist-url').value;
    fetchPlaylistData(playlistUrl)
      .then(data => {
        currentPlaylist = data.tracks.items;
        displayInitialPlaylist(currentPlaylist);
      })
      .catch(error => {
        console.error('Error fetching playlist data:', error);
        resultDiv.textContent = 'An error occurred while fetching the playlist.';
      });
  });

  document.getElementById('rank-button').addEventListener('click', function () {
    if (comparisonCount >= Math.floor(currentPlaylist.length / 2)) {
      displayFinalRanking();
    }
  });
});