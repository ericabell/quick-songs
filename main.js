// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play

let input = document.querySelector('input');
let form = document.querySelector('form');
form.addEventListener('submit', function(e){
  e.preventDefault();
  goFetch(input.value);
});
// let button = document.querySelector('button');
// button.addEventListener('click', goFetch);


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

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
        let results = data.results;
        let container = document.querySelector('.results');
        container.innerHTML = '';

        for (let i = 0; i < results.length; i++) {
          let result = results[i];

          let template = `
          <div>
          <img src=${result.artworkUrl100}>
          <p> ${result.trackName} </p>
          <p> ${result.artistName} </p>
          </div>`;
          container.innerHTML += template;
        }

      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}
