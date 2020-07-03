let pokemonRepository = (function() {
  let pokemonList = [],
      apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let ulElement = $('.pokemon-list'),
        listItem = $('<li class="list-group-item border-0"></li>'),
        button = $(
      '<button type="button" class="btn btn-outline-dark btn-lg" data-toggle="modal" data-target="#modalContainer">' +
        pokemon.name +
        '</button>'
    );


    $(ulElement).append(listItem);
    $(listItem).append(button);
    $(button).on('click', function(event) {    // eslint-disable-line no-unused-vars

      showDetails(pokemon);
    });
  }
/* eslint no-console: ["error", { allow: ["warn", "error","log"] }] */
  function loadList() {
    return $.ajax(apiUrl, {
      dataType: 'json'
    })
      .then(function(json) {
        $.each(json.results, function(index, item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return $.ajax(url, {
      dataType: 'json'
    })
      .then(function(response) {
        return response;
      })
      .then(function(details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  function showDetails(item) {
    loadDetails(item).then(function() {
      showModal(item);
    });
  }

  function showModal(pokemon) {
    const pokemonName = pokemon.name,
          pokemonHeight = pokemon.height,
          pokemonImage = pokemon.imageUrl;

    let modalBody = $('.modal-body'),
        modalTitle = $('.modal-title');

    // Clear all existing modal content
    $(modalBody).empty();
    $(modalTitle).empty();

    // Add the new modal content

    let titleElement = $('<h1>' + pokemonName + '</h1>'),
        contentElement = $('<p> Height: ' + pokemonHeight + '</p>'),
        imageElement = $('<img class="pokemon-image"></img>');
    $(imageElement).attr('src', pokemonImage);

    $(modalTitle).append(titleElement);
    $(modalBody).append(imageElement);
    $(modalBody).append(contentElement);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

//search

$(document).ready(function() {
  $('#searchInput').on('keyup', function() {
    let value = $(this)
      .val()
      .toLowerCase();
    $('#pokemon-container *').filter(function() {
      $(this).toggle(
        $(this)
          .text()
          .toLowerCase()
          .indexOf(value) > -1
      );
    });
  });
});
