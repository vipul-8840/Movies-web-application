// Vanilla Javascript
// TDMB API
const Api_key = "5dab1046fd25a748ffea2f6840cb3f6b";
const Base_url = "https://api.themoviedb.org/3";
const url = Base_url + "/discover/movie?sort_by=popularity.desc&api_key=" + Api_key;
// const url = "https://api.themoviedb.org/3/discover/movie?api_key=<<5dab1046fd25a748ffea2f6840cb3f6b>>&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate"
const image_url = "https://image.tmdb.org/t/p/w500";
const input = document.querySelector("#search");
const form = document.querySelector("#form");
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const Movie_name = input.value;
    if (Movie_name) {
        const search_ulr = Base_url + "/search/movie?&api_key=" + Api_key;
        fetch(search_ulr + '&query=' + Movie_name).then(res => res.json()).then(data => {
            Moviedetail(data);
        })
    } else {
        Mymovie();
    }

})

async function Mymovie() {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    Moviedetail(data)

}
const main = document.querySelector("#main");

function Moviedetail(data) {
    console.log(data)
    main.innerHTML = "";
    if (data.results.length === 0) {
        main.innerHTML = "<h1 class=not-found>No Results Found</h>"
    }
    data.results.forEach(movie => {

        const newMovie = document.createElement('div');
        newMovie.classList.add('movie');
        newMovie.innerHTML = `
        <img src="${image_url+movie.poster_path
        }">
        <div class="movie-info">
            <h3>${movie.original_title}</h3>
            <span class="${color(movie.vote_average)}">${movie.vote_average
            }</span>
        </div>
        <div class="overview">
            <h3>overview</h3>
            ${movie.overview}
        </div>
       
       
       `
        main.appendChild(newMovie);
    });
}

function color(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}
Mymovie();
