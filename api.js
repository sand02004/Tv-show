 function searchShow() {
      const query = document.getElementById('searchInput').value;
      const url = `https://api.tvmaze.com/search/shows?q=${query}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          const resultDiv = document.getElementById('result');
          resultDiv.innerHTML = ''; // Clear old results

          if (data.length === 0) {
            resultDiv.innerHTML = '<p>No shows found.</p>';
            return;
          }

          data.forEach(item => {
            const show = item.show;
            const showDiv = document.createElement('div');
            showDiv.className = 'show-container';

            const title = `<h2>${show.name}</h2>`;
            const summary = show.summary ? `<p>${show.summary}</p>` : `<p>No summary available.</p>`;
            const image = show.image ? `<img src="${show.image.medium}" alt="${show.name}">` : '';
            const genres = show.genres.length ? `<p class="genres">Genres: ${show.genres.join(', ')}</p>` : '';

            showDiv.innerHTML = `${title}${image}${summary}${genres}`;
            resultDiv.appendChild(showDiv);
          });
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    }