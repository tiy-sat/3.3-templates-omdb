(function() {
  // All code NOT referencing DOM elements can go here

  document.addEventListener("DOMContentLoaded", function(e){
    // ALL DOM RELATED QUERYING GOES HERE
    var moviesElement = document.querySelector("[data-js='movies']");
    var inputMovieTitle = document.querySelector("[data-js='input__movieTitle']");
    var submitMovieTitle = document.querySelector("[data-js='submit--movieTitle']");

    // When I click submit
    // Will add event listener
    submitMovieTitle.addEventListener("click", function(e){
      var movieTitleVal = inputMovieTitle.value;

      // Remove existing list of movies
      moviesElement.innerHTML = "";

      var omdbXHR = new XMLHttpRequest();
      omdbXHR.open("GET", `http://www.omdbapi.com/?s=${movieTitleVal}`);
      omdbXHR.send();


      omdbXHR.addEventListener("load", function(e){
        searchData = JSON.parse(e.target.responseText);
        console.log(e);

        if(searchData.Response === "False"){
          // Render error message
          moviesElement.innerHTML = `
            <h2 class="movie__error"> ${ searchData.Error } </h2>
          `
          // No longer want to run logic below here
          return;
        }else{
          searchDataResultsArray = searchData.Search;
        }

        // For Each - Array reference dot forEach then callback with
        // Argument of reference to current context
        searchDataResultsArray.forEach(function(result){
          moviesElement.innerHTML += createArticle(result.Title, result.Poster);
          // End article tag
        });
      });

      // Prevent default for form submit
      // So the page will not refresh to action value
      e.preventDefault();
    });
  }); // Closes DOMContentLoaded listener
}()); // Closes IIFE

// All template functions here
function createArticle(title, poster){
  return `
    <article class="movie">
      <h2 class="movie__title"> ${title} </h2>
      <img class="movie__poster" src="${poster}">
    </article>
  `;
}
