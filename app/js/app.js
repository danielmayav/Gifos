const apiKey = "qgKLO2sdzTr5Cniqn4m1BUGs6UiWP5bl";
const searchGif = document.querySelector('#searchGif');

const querySearch = searchGif.addEventListener('submit', function(e){
    e.preventDefault();
    e.targer.elements.searchBar.value = ''
    
})

const searchPath = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${querySearch}&limit=36`;

console.log(searchGif);