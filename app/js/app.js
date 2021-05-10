const apiKey = "qgKLO2sdzTr5Cniqn4m1BUGs6UiWP5bl";
const searchGif = document.querySelector('#searchGif');
const querySearch = 'cats';

const searchPath = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${querySearch}&limit=10`;


fetch(searchPath)
.then(function(res){
    return res.json()
})
.then(function(json){
    const searchResult = document.querySelector('#results');
    let resultHTML = ''

    json.data.forEach(function(obj){
      console.log(obj.images.downsized.url)
      const url = obj.images.downsized.url;
      resultHTML += `<img src="${url}>"`;

   })

   searchResult.innerHTML = resultHTML;
}) .catch (function(err){
    console.log(err.message)
})


