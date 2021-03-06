let offsetSearch = 0;

// ========    SEARCH SUGESTIONS

searchBar.addEventListener('input', () => {
    let searchInput =searchBar.value
    if (searchInput.length >=1) {
        inputContainer.classList.remove('input-cont')
        inputContainer.classList.add('input-cont-act')
        sugList.style.display = "inline-block"
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
        sugList.innerHTML = ''
        sugList.style.display ="none"
    }
})

function renderSugg (data){
    let suggestion = data.data;
    sugList.innerHTML = `
    <li class="suggestion">
        <img src="./assets/icon-search-gris.svg" alt="sugerencia-lupa-gris"
        class="sugerencia-lupa-gris">
        <p class="sugg-text">${suggestion[0].name}</p>
    </li>
    <li class="suggestion">
        <img src="./assets/icon-search-gris.svg" alt="sugerencia-lupa-gris"
        class="sugerencia-lupa-gris">
        <p class="sugg-text">${suggestion[1].name}</p>
    </li>
    <li class="suggestion">
        <img src="./assets/icon-search-gris.svg" alt="sugerencia-lupa-gris"
        class="sugerencia-lupa-gris">
        <p class="sugg-text">${suggestion[2].name}</p>
    </li>
    <li class="suggestion">
        <img src="./assets/icon-search-gris.svg" alt="sugerencia-lupa-gris"
        class="sugerencia-lupa-gris">
        <p class="sugg-text">${suggestion[3].name}</p>
    </li>
    <li class="suggestion">
        <img src="./assets/icon-search-gris.svg" alt="sugerencia-lupa-gris"
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
})
console.log(searchBar.value)
async function search(q) {
    const searchPath = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=12&offset=${offsetSearch}`;
    console.log(searchPath)
    searchResult.innerHTML = ''
    await fetch(searchPath)
        .then(res => res.json())
        .then(json => {   
            searchTitle.innerHTML = `${q}`
            
            if (json.data == 0){
                
                searchResult.innerHTML = `
                <div class="search-no-results">
                <img
                src="./assets/icon-busqueda-sin-resultado.svg"
                >
                <p>Intenta con otra búsqueda.</p>
                </div>
                `
            }
            else {for  (let i = 0; i <json.data.length; i++) {
                renderSearch(json.data[i])
                btnVermas.style.display = 'block'
            }}
        }) .catch (err => console.log(err)
        )
}

function renderSearch(obj) {
    let title = obj.title
    let user = obj.username
    let urlImg = obj.images.downsized.url
    if (urlImg == null) {
        urlImg = obj.images.original.url
    }
    let id = obj.id
    let urlFullSize = obj.images.original.url
    let slug = obj.slug 
    searchTitle.style.display = "block"
    searchResult.innerHTML += `
    <div class="gif-cont" onclick="expandGifMob('${urlImg}', '${title}', '${user}', '${slug}', '${id}')">
    <div class="card-details">
        <div class="icons-details">
            <button class="card-details__btn __fav" onclick="agregarFavorito('${id}', '${urlImg}', '${title}', '${user}', '${slug}' )" id="icon-fav-${id}"></button>
            <button class="card-details__btn __dwld" onclick="descargarGif('${urlImg}', '${slug}')"></button>
            <button class="card-details__btn __expand" onclick="expandGif('${urlFullSize}', '${title}', '${user}', '${slug}', '${id}')"></button>
        </div>
        <div class="card-details__text">
            <p>${user}</p>
            <h5>${title}</h5>
        </div>
    </div>
    <img src="${urlImg}" alt="${title}" class="img-gif">
    </div>
    `
    

}

btnVermas.addEventListener('click', verMas)

function verMas () {
    offsetSearch += 12;
    searchVerMas()
}


async function searchVerMas (){
    let q = searchBar.value
    const searchPath = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=12&offset=${offsetSearch}`;
    console.log(searchPath)
    await fetch(searchPath)
        .then(res => res.json())
        .then(json => {   
            searchTitle.innerHTML = `${q}`
            
            if (json.data == 0){
                
                searchResult.innerHTML = `
                <div class="search-no-results">
                <img
                src="./assets/icon-busqueda-sin-resultado.svg"
                >
                <p>Intenta con otra búsqueda.</p>
                </div>
                `
                btnVermas.style.display = 'none'
            }
            else { for(let i = 0; i <json.data.length; i++) {
                renderSearch(json.data[i])
                btnVermas.style.display = 'block'
                if (offsetSearch >= 36){
                    btnVermas.style.display = 'none'
                }
            }}
        }) .catch (function(err){
            console.log(err.message)
        })
}