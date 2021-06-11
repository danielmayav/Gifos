const apiKey = "qgKLO2sdzTr5Cniqn4m1BUGs6UiWP5bl";
const searchResult = document.getElementById('results');
const btnVermas = document.getElementById('btn-vermas');
const sugList = document.getElementById('sug-list');
const inputContainer = document.getElementById ('inputContainer');

// ========    SEARCH SUGESTIONS

searchBar.addEventListener('input', () => {
    let searchInput =searchBar.value
    if (searchInput.length >=1) {
        inputContainer.classList.remove('input-cont')
        inputContainer.classList.add('input-cont-act')
        fetch (`https://api.giphy.com/v1/tags/related/${searchInput}?api_key=${apiKey}&limit=5`)
        .then(response => response.json())
        .then(data => {
            renderSugg(data)
        }) 
        .catch (function(err){
            console.log(err.message)
        })
    } else {
        inputContainer.classList.remove('input-cont-act')
        inputContainer.classList.add('input-cont')
        sugList.innerHTML=''
    }
})

function renderSugg (data){
    let suggestion = data.data;
    sugList.innerHTML = `
    <li class="suggestion">
        <img src="/assets/icon-search-gris.svg" alt="sugerencia-lupa-gris"
        class="sugerencia-lupa-gris">
        <p class="sugg-text">${suggestion[0].name}</p>
    </li>
    <li class="suggestion">
        <img src="/assets/icon-search-gris.svg" alt="sugerencia-lupa-gris"
        class="sugerencia-lupa-gris">
        <p class="sugg-text">${suggestion[1].name}</p>
    </li>
    <li class="suggestion">
        <img src="/assets/icon-search-gris.svg" alt="sugerencia-lupa-gris"
        class="sugerencia-lupa-gris">
        <p class="sugg-text">${suggestion[2].name}</p>
    </li>
    <li class="suggestion">
        <img src="/assets/icon-search-gris.svg" alt="sugerencia-lupa-gris"
        class="sugerencia-lupa-gris">
        <p class="sugg-text">${suggestion[3].name}</p>
    </li>
    <li class="suggestion">
        <img src="/assets/icon-search-gris.svg" alt="sugerencia-lupa-gris"
        class="sugerencia-lupa-gris">
        <p class="sugg-text">${suggestion[4].name}</p>
    </li>
    `
}

sugList.addEventListener('click', (li) => {
    searchBar.value = li.target.textContent;
    search(searchBar.value)
})




// ======= SEARCH

searchGif.addEventListener('submit', function(e){
   e.preventDefault()
   const q = searchBar.value
   search(q)
   searchBar.value = ''
})

function search (q){
    const searchPath = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=12`;
    console.log(searchPath)
    searchResult.innerHTML = ''
    fetch(searchPath)
        .then(async function(res){
           return res.json()
        })
        .then(async function(json){   
            let resultHTML = ''
            let  searchTitle = `<h2>${q}</h2>`
            json.data.forEach(function(obj){
                let title = obj.title
                let user = obj.username
                let urlImg = obj.images.downsized.url
                let id = obj.id
                let slug = obj.slug
                resultHTML += `
                <div class="gif-cont" onclick="maxGifMobileTrending('${urlImg}', '${id}', '${slug}', '${user}', '${title}')")>
                <div class="card-details">
                    <div class="icons-details">
                        <button class="card-details__btn __fav" onclick="agregarFavoritoTrending('${id}')" id="icon-fav-trending-${id}></button>
                        <button class="card-details__btn __dwld" onclick="descargarGifTrending('${urlImg}', '${slug}')"></button>
                        <button class="card-details__btn __expand" onclick="maxGifDesktopTrending('${urlImg}', '${id}', '${slug}', '${user}', '${title}')"></button>
                    </div>
                    <div class="card-details__text">
                        <p>${user}</p>
                        <h5>${title}</h5>
                    </div>
                </div>
                <img src="${urlImg}" alt="${title}" class="img-gif">
                </div>
                `
                btnVermas.style.display = 'block'
               
                /* resultHTML = document.createElement("img")
                resultHTML.src = urlPath;
                resultHTML.classList.add('gif')
                searchResult.appendChild(resultHTML) */
                
            })
            searchResult.innerHTML = searchTitle + resultHTML;
            if (searchResult.innerHTML === `<h2>${q}</h2>`){
                
                searchResult.innerHTML = `
                <div class="search-no-results">
                <h2>${q}</h2>
                <img
                src="/assets/icon-busqueda-sin-resultado.svg"
                >
                <p>Intenta con otra búsqueda.</p>
                </div>
                `
            }
            }) .catch (function(err){
                console.log(err.message)
        })
}


