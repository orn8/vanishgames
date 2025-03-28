document.addEventListener('DOMContentLoaded', function() {
  function fetchAndSetupButtons() {
    fetch('gamelist.txt')
      .then(response => response.text())
      .then(gamesString => {
        const lines = gamesString.split('\n');
        const filteredLines = lines.filter(line => line.trim() !== '' && !line.trim().startsWith('##'));
        const filteredGamesString = filteredLines.join('\n');
        setupButtons(filteredGamesString);
      });
  }

  function setupButtons(gamesString) {
    const buttonsContainer = document.getElementById('gameButtons');

    const gamesArray = gamesString.trim().split('\n')
      .map(line => {
        const [name, url] = line.split(';').map(part => part.trim());
        return { name, url };
      })
      .filter(game => game.name && game.url)
      .sort((a, b) => a.name.localeCompare(b.name));

    const gamesHeading = document.querySelector('h1');
    gamesHeading.textContent = `Games (${gamesArray.length})`;
    
    gamesArray.forEach(game => {
      const button = document.createElement('button');
      button.textContent = game.name;
      button.dataset.url = game.url;
      button.classList.add('button');
      button.addEventListener('click', function() {
        const encodedUrl = encodeURIComponent(game.url);
        const encodedTitle = encodeURIComponent(game.name)
        window.open(`gameX.html?url=${encodedUrl}&title=${encodedTitle}`, '_blank');
      });
      buttonsContainer.appendChild(button);
    });
  }

  function searchGames() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toUpperCase();
    const buttons = [...document.getElementById('gameButtons').getElementsByTagName('button')];
    buttons.forEach(button => {
      const text = button.textContent || button.innerText;
      button.style.display = text.toUpperCase().includes(filter) ? '' : 'none';
    });
  }

  const searchButton = document.getElementById('searchButton');
  const searchInput = document.getElementById('searchInput');

  function triggerSearchButtonEffect() {
    searchButton.style.backgroundColor = '#FC6A04';
    searchButton.style.color = '#f5f5f5';
    setTimeout(function() {
      if (!searchButton.matches(':hover')) {
        searchButton.style.backgroundColor = '';
        searchButton.style.color = '';
      }
    }, 300);
  }

  searchInput.addEventListener('input', searchGames);
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      triggerSearchButtonEffect();
      searchInput.blur();
    }
  });

  fetchAndSetupButtons();
});

// App menu
(function() {
  // URLs for hosted files
  const cssUrl = "https://raw.githubusercontent.com/orn8/appmenu/refs/heads/main/appmenu.css";
  const jsUrl = "https://raw.githubusercontent.com/orn8/appmenu/refs/heads/main/appmenu.js";
  const htmlUrl = "https://raw.githubusercontent.com/orn8/appmenu/refs/heads/main/appmenu.html";

  // Function to load CSS
  function loadCSS(url) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = url;
      document.head.appendChild(link);
  }

  // Function to load JavaScript
  function loadJS(url) {
      return new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = url;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
      });
  }

  // Function to load HTML and append it to the body
  function loadHTML(url) {
      return fetch(url)
          .then(response => response.text())
          .then(html => {
              document.body.insertAdjacentHTML("afterbegin", html);
          });
  }

  // Load CSS, HTML, and JS
  loadCSS(cssUrl);
  loadHTML(htmlUrl)
      .then(() => loadJS(jsUrl))
      .catch(error => console.error("Error loading app menu:", error));
})();