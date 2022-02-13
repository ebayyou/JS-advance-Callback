// todo mengulang latihan callback (Mengunakan jquery)

// todo membuat funtion ketika button "search" di klik (memunculkan data dari request api) sesuai yang di input user
$('.search-btn').on('click', function () {
  // todo merequest data API
  $.ajax({
    url: 'http://www.omdbapi.com/?apikey=d5a13458&s=' + $('.input-keyword').val(),
    // ? jika request success
    success: (results) => {
      const movies = results.Search;
      let cards = '';

      // * me-looping semua data dari request API's
      movies.forEach((m) => {
        cards += showCards(m);
      });
      // simpan kedalam elemen html yang classnya ".movie-container"
      $('.movie-container').html(cards);

      //  todo ketika button "show detail" di klik
      $('.btn-target-modal').on('click', function () {
        // todo me-request data tambahan dari API
        $.ajax({
          url: 'http://www.omdbapi.com/?apikey=d5a13458&i=' + $(this).data('imdb'),
          // ? jika request success
          success: (m) => {
            const detail = showMovieDetail(m);

            // simpan kedalam elemen html yang classnya ".modal-body"
            $('.modal-body').html(detail);
          },
          // ! jika request error
          error: (e) => {
            console.log(e.reponseText);
          },
        });
      });
    },
    // ! jika request error
    error: (e) => {
      console.log(e.reponseText);
    },
  });
});

//

//

// function tambahan

function showCards(m) {
  return `<div class="col-md-4 my-3">
                        <div class="card shadow" >
                    <img src="${m.Poster}" class="card-img-top" >
                    <div class="card-body">
                        <h5 class="card-title">${m.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                        <button type="button" class="btn btn-primary btn-target-modal" data-bs-toggle="modal" data-bs-target="#modal-btn" data-imdb="${m.imdbID}">Show Detail</button>
                    </div>
                    </div>
                </div>`;
}

function showMovieDetail(m) {
  return `<div class="container-fluid">
  <div class="row">
        <div class="col-md-3">
          <img src="${m.Poster}" class="img-fluid" />
        </div>
        <div class="col-md">
          <ul class="list-group">
            <li class="list-group-item"><h4>${m.Title}</h4></li>
            <li class="list-group-item"><strong>Director : </strong> ${m.Director}</li>
            <li class="list-group-item"><strong>Actors : </strong> ${m.Actors}</li>
            <li class="list-group-item"><strong>Writer : </strong> ${m.Writer}</li>
            <li class="list-group-item"><strong>Plot : </strong><br />
              ${m.Plot}</li>
          </ul>
        </div>
      </div>
  </div>`;
}
