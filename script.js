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

// App Menu
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("app-menu-button");
  const menuGrid = document.getElementById("app-menu-grid");

  menuButton.addEventListener("click", () => {
    menuGrid.classList.toggle("show");
  });

  const appItems = document.querySelectorAll(".app-menu-item");

  appItems.forEach((item) => {
    item.addEventListener("click", () => {
      const link = item.dataset.link;
      if (link) {
        window.open(link, "_blank");
      }
    });
  });
});
