let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let ulElement = $('.pokemon-list');
    let listItem = $('<li></li>');
    let button = $('<button class="button-class">' pokemon.name '</button>');
    $('ulElement').append('listItem');
    $('listItem').append('button');
    $('button').on('click', function(event) {
      showDetails(pokemon);

    })

  }


  function loadList() {
    return $.ajax(apiUrl, {
      dataType: 'json'
    }).then(function(json) {
      $.each(json.results, function(index, item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return $.ajax(url, {
      dataType: 'json'
    }).then(function(response) {
      return response.json();
    }).then(function(details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function(e) {
      console.error(e);
    });
  }


  function showDetails(item) {
    loadDetails(item).then(function() {
      console.log(item);
      showModal(item);
    });
  }

  let modalContainer = $('#modal-container');

  function showModal(pokemon) {
    const pokemonName = pokemon.name;
    const pokemonHeight = pokemon.height;
    const pokemonImage = pokemon.imageUrl;
    // Clear all existing modal content
    $('modalContainer').html('');

    let modal = $('<div class="modal"></div>');

    // Add the new modal content
    let closeButtonElement = $('<button class="modal-close">Close</button');
    $('closeButtonElement').on('click', hideModal);

    let titleElement = $('<h1>' pokemonName '</h1>');

    let contentElement = $('<p>' "Height: " + pokemonHeight '</p>');

    let imageElement = $('<img class="pokemon-image"></img>');
    imageElement.src = pokemonImage;



    $('modal').append('closeButtonElement');
    $('modal').append('titleElement');
    $('modal').append('imageElement');
    $('modal').append('contentElement');
    $('modalContainer').append('modal');

    $('modalContainer').addClass('is-visible');
  }

  function hideModal() {
    $('modalContainer').removeClass('is-visible');
  }


  // hides modal when Escape key is hit
  $(window).on('keydown', (e) => {
    if (e.key === 'Escape' && $('modalContainer').hasClass('is-visible')) {
      hideModal();
    }
  });

  //hides modal when close button is hit
  $('modalContainer').on('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });


  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    hideModal: hideModal
  };
})();


pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
