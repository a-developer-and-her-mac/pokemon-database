let pokemonRepository=function(){let t=[],n="https://pokeapi.co/api/v2/pokemon/?limit=150";function o(n){t.push(n)}function e(t){let n=t.detailsUrl;return $.ajax(n,{dataType:"json"}).then(function(t){return t}).then(function(n){t.imageUrl=n.sprites.front_default,t.height=n.height,t.types=n.types}).catch(function(t){console.error(t)})}function i(t){e(t).then(function(){a(t)})}function a(t){const n=t.name,o=t.height,e=t.imageUrl;let i=$(".modal-body"),a=$(".modal-title");$(i).empty(),$(a).empty();let l=$("<h1>"+n+"</h1>"),c=$("<p> Height: "+o+"</p>"),r=$('<img class="pokemon-image"></img>');$(r).attr("src",e),$(a).append(l),$(i).append(r),$(i).append(c)}return{add:o,getAll:function(){return t},addListItem:function(t){let n=$(".pokemon-list"),o=$('<li class="list-group-item border-0"></li>'),e=$('<button type="button" class="btn btn-outline-dark btn-lg" data-toggle="modal" data-target="#modalContainer">'+t.name+"</button>");$(e).hover(function(){$(this).css("background-color","#947397")},function(){$(this).css("background-color","#d8bfd8")}),$(n).append(o),$(o).append(e),$(e).on("click",function(n){i(t)})},loadList:function(){return $.ajax(n,{dataType:"json"}).then(function(t){$.each(t.results,function(t,n){o({name:n.name,detailsUrl:n.url})})}).catch(function(t){console.error(t)})},loadDetails:e,showDetails:i,showModal:a}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})}),$(document).ready(function(){$("#searchInput").on("keyup",function(){let t=$(this).val().toLowerCase();$("#pokemon-container *").filter(function(){$(this).toggle($(this).text().toLowerCase().indexOf(t)>-1)})})});
