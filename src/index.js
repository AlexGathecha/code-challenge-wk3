document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/films/1')
      .then(response => response.json())
      .then(movie => displayMovieDetails(movie));
  });
  
  function displayMovieDetails(movie) {
    const movieDetails = document.querySelector('#movie-details');
    movieDetails.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}">
      <h2>${movie.title}</h2>
      <p>Runtime: ${movie.runtime} minutes</p>
      <p>Showtime: ${movie.showtime}</p>
      <p>Tickets Available: ${movie.capacity - movie.tickets_sold}</p>
    `;
  }

  function fetchAndDisplayAllMovies() {
    fetch('http://localhost:3000/films')
      .then(response => response.json())
      .then(movies => {
        const filmsList = document.querySelector('#films');
        filmsList.innerHTML = ''; 
        movies.forEach(movie => {
          const li = document.createElement('li');
          li.textContent = movie.title;
          li.className = 'film item'; 
          filmsList.appendChild(li);
        });
      });
  }
  
  fetchAndDisplayAllMovies();

  function buyTicket(movieId) {
    const newTicketsSold = currentTicketsSold + 1;
  
    fetch(`http://localhost:3000/films/${movieId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "tickets_sold": newTicketsSold }),
    })
    .then(response => response.json())
    .then(updatedMovie => {

      displayMovieDetails(updatedMovie);
    });
  }
  
  function deleteFilm(filmId) {
    fetch(`http://localhost:3000/films/${filmId}`, {
      method: 'DELETE'
    })
    .then(() => {
    
      document.querySelector(`#film-${filmId}`).remove();
    });
  }
  