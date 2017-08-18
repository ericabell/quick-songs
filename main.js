let player = document.querySelector('.player');
let playerImage = document.querySelector('.player-image');
let playerInfo = document.querySelector('.player-info');
let audio = document.querySelector('audio');
let input = document.querySelector('input');
let search = document.querySelector('.search-go');
search.addEventListener('click', e => {
  e.preventDefault();
  goFetch(input.value);
});
let form = document.querySelector('form');
form.addEventListener('submit', function(e){
  e.preventDefault();
  goFetch(input.value);
});

// TODO take this out
goFetch('the weeknd');

function goFetch(search) {
console.log('fetch!');
fetch('https://itunes.apple.com/search?term=' + search)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      response.json().then(function(data) {
        console.log(data);
        let results = data.results;
        let container = document.querySelector('.results');
        container.innerHTML = '';

        for (let i = 0; i < results.length; i++) {
          let result = results[i];
          let div = document.createElement('div');
          div.classList.add('result');
          let template = `
          <img src=${result.artworkUrl100}>
          <p> ${result.trackName} </p>
          <p><span class="fancy">${result.artistName}</span></p>`;
          // <p> ${result.collectionName}</p>
          // <br>${result.collectionName}
          div.addEventListener('click', function() {
            audio.src = result.previewUrl;
            player.style.display = 'flex';
            playerImage.src = result.artworkUrl100;
            playerInfo.innerHTML = `${result.trackName}<br>${result.collectionName}<br>${result.artistName}`
          });
          div.innerHTML += template;
          container.appendChild(div);
        }

      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}
