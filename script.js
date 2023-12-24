document.addEventListener('DOMContentLoaded', function() {
  function fetchAndSetupButtons() {
    fetch('gamelist.txt')
      .then(response => response.text())
      .then(gamesString => {
        setupButtons(gamesString);
      });
  }

  function setupButtons(gamesString) {
    const buttonsContainer = document.getElementById('gameButtons');

    const gamesArray = gamesString.trim().split('\n')
      .map(line => {
        const [name, url] = line.split(';').map(part => part.trim());
        return { name, url };
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    gamesArray.forEach(game => {
      const button = document.createElement('button');
      button.textContent = game.name;
      button.dataset.url = game.url;
      button.classList.add('button');
      button.addEventListener('click', function() {
        const gameTitle = game.name;
        const encodedUrl = encodeURIComponent(game.url);
        window.open(`gameX.html?url=${encodedUrl}&title=${gameTitle}`, '_blank');
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
    searchButton.style.backgroundColor = '#555';
    searchButton.style.color = 'white';
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

  searchButton.addEventListener('click', function() {
    if (searchInput.value !== '') {
      triggerSearchButtonEffect();
    }
  });

  searchButton.addEventListener('mouseover', function() {
    if (searchInput.value !== '') {
      this.style.backgroundColor = '#555';
      this.style.color = 'white';
    }
  });

  searchButton.addEventListener('mouseout', function() {
    if (!searchButton.matches(':hover')) {
      this.style.backgroundColor = '';
      this.style.color = '';
    }
  });

  fetchAndSetupButtons();
});