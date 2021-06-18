// descargar GIF

async function descargarGif(gifImg, gifNombre) {
    let blob = await fetch(gifImg).then(img => img.blob());
    invokeSaveAsDialog(blob, gifNombre + ".gif");
}
// Expand in Mobil
function maxGifMobile () {
    if (window.matchMedia("(min-width:749px)").matches) {

    }
}

// Add Fav to Local Storage

let favoritosArr = []

function agregarFavorito(id, url, title, user,slug) {
    let objectGif = {
        id: id,
        url: url,
        title: title,
        user: user,
        slug: slug,
    }
    favoritosArr.push(objectGif);
    localStorage.setItem('favorites', JSON.stringify(favoritosArr));
    let btnFav = document.getElementById(`icon-fav-${id}`)
    btnFav.style.backgroundImage = "var(--btn-fav-act)"
    renderFavs()
}

// RENDER FAVS
function renderFavs () {
    favoritosArr = []
    favoritosArr = JSON.parse(localStorage.getItem('favorites'))
    FAV_CONT.innerHTML = ''
    if (favoritosArr == null) {
    } else {
        for(let i = 0; i < favoritosArr.length; i++) {
            let urlImg = favoritosArr[i].url
            let id = favoritosArr[i].id
            let title = favoritosArr[i].title
            let user = favoritosArr[i].user
            let slug = favoritosArr[i].slug
            FAV_CONT.innerHTML += `<div class="gif-cont" onclick="maxGifMobile('${urlImg}', '${id}', '${slug}', '${user}', '${title}')")>
            <div class="card-details">
                <div class="icons-details">
                    <button class="card-details__btn __trash"></button>
                    <button class="card-details__btn __dwld" onclick="descargarGif('${urlImg}', '${slug}')"></button>
                    <button class="card-details__btn __expand" onclick="expandGif('${urlImg}', '${title}', '${user}')"></button>
                </div>
                <div class="card-details__text">
                    <p>${user}</p>
                    <h5>${title}</h5>
                </div>
            </div>
            <img src="${urlImg}" alt="${title}" class="img-gif">
            </div>`
        }
    } 
}

function expandGif(url, title, user) {
    console.log('expand')
    EXPAND_OVERLAY.style.visibility = "visible"
    EXPAND_GIF.setAttribute('src', `${url}`)
    EXPAND_TEXT.innerHTML = `
    <p>${user}</p>
    <h3>${title}</h3>
    `
}

function closeExpand() {
    EXPAND_OVERLAY.style.visibility = "hidden"
}