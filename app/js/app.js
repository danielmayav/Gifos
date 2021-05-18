const apiKey = "qgKLO2sdzTr5Cniqn4m1BUGs6UiWP5bl";
const searchResult = document.getElementById('results');
const trendingResult = document.querySelector('#trendContainer');

// ======= SEARCH

searchGif.addEventListener('submit', function(e){
   e.preventDefault()
   const q = searchBar.value
   search(q)
   searchBar.value = ''
})

async function search (q){
    const searchPath = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=12`;
    console.log(searchPath)
    searchResult.innerHTML = ''
    fetch(searchPath)
        .then(async function(res){
            return await res.json()
        })
        .then(async function(json){   
            let resultHTML = ''
            let  searchTitle = `<h2>${q}</h2><br>`
            await json.data.forEach(function(obj){
                const titlePath = obj.title
                const urlPath = obj.images.downsized.url;
                let user = obj.username;
                resultHTML += `
                <br>
                <div class="gif-cont" 
                    style=" background-image: url(${urlPath});">
                <div class="card-details">
                 <button class="card-details__btn __fav"></button>
                 <button class="card-details__btn __dwld"></button>
                 <button class="card-details__btn  __expand"></button>
                <div class="card-details__text">
                <p>${user}</p>
                <h5>${titlePath}</h5>
                </div>
                </div>
                </div>
                `
               
                /* resultHTML = document.createElement("img")
                resultHTML.src = urlPath;
                resultHTML.classList.add('gif')
                searchResult.appendChild(resultHTML) */
                
            })
            searchResult.innerHTML = searchTitle + resultHTML;
            if (searchResult.innerHTML === `<h2>${q}</h2>`){
                
                searchResult.innerHTML = `<h2>${q}</h2>
                <img
                src=/assets/icon-busqueda-sin-resultado.svg
                >
                <p>Intenta con otra búsqueda.</p>`
            }
            }) .catch (function(err){
                console.log(err.message)
        })
}


// ======   TRENDING

async function trend () {
    const trendPath = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=3`
    fetch (trendPath)
    .then (async function (res){
        return await res.json()
    })
    .then (async function(json){
        let trendRender = ''
        json.data.forEach(function(obj){
            let title = obj.title
            let user = obj.username
            let url = obj.images.downsized.url
            trendRender += `
            <div class="gif-cont" 
                style=" background-image: url(${url});
                        background-repeat:no-repeat;">
            <div class="card-details">
             <button class="card-details__btn __fav"></button>
             <button class="card-details__btn __dwld"></button>
             <button class="card-details__btn  __expand"></button>
            <div class="card-details__text">
            <p>${user}</p>
            <h5>${title}</h5>
            </div>
            </div>
            </div>
            `
        })
        
        trendingResult.innerHTML = trendRender;
    }) .catch (function(err){
        console.log(err.message);
    })
}
trend()
