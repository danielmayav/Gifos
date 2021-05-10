const apiKey = "qgKLO2sdzTr5Cniqn4m1BUGs6UiWP5bl";
const searchGif = document.querySelector('#searchGif');
const querySearch = 'cats';

const searchPath = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${querySearch}&limit=12`;


fetch(searchPath)
.then(function(res){
    return res.json()
})
.then(function(json){
    const searchResult = document.getElementById('results');
    let resultHTML = ''

    json.data.forEach(function(obj){
      console.log(obj.images.downsized.url)
      let urlPath = obj.images.downsized.url;
      resultHTML = document.createElement("img")
      resultHTML.src = urlPath;
      resultHTML.classList.add('gif')
      searchResult.appendChild(resultHTML)
      

   })
   
   
   
}) .catch (function(err){
    console.log(err.message)
})


