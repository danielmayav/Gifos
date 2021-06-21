// descargar GIF

async function descargarGif(gifImg, gifNombre) {
    let blob = await fetch(gifImg).then(img => img.blob());
    invokeSaveAsDialog(blob, gifNombre + ".gif");
}

// Add Fav to Local Storage

let favoritosArr = []

function agregarFavorito(id, url, title, user,slug) {
    if (favoritosArr == null) {
        favoritosArr = []
    }
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
    let btnFavExpnd = document.getElementById('favExpnd')
    btnFav.style.backgroundImage = "var(--btn-fav-act)"
    btnFavExpnd.style.backgroundImage = "var(--btn-fav-act)"
    renderFavs()
}

// =======       RENDER FAVS
function renderFavs() {
    //favoritosArr = []
    favoritosArr = JSON.parse(localStorage.getItem('favorites'))
    FAV_CONT.innerHTML = ''
    if (favoritosArr == null) { 
        FAV_CONT.innerHTML = `
        <div class="fav-sin-contenido">
        <img src="./assets/icon-fav-sin-contenido.svg" alt="sin contenido">
        <p>¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!</p>
        </div>
        `
    } else {
        for(let i = 0; i < favoritosArr.length; i++) {
            let urlImg = favoritosArr[i].url
            let id = favoritosArr[i].id
            let title = favoritosArr[i].title
            let user = favoritosArr[i].user
            let slug = favoritosArr[i].slug
            FAV_CONT.innerHTML += `<div class="gif-cont" onclick="expandGifMob('${urlImg}', '${title}', '${user}', '${slug}', '${id}')">
            <div class="card-details">
                <div class="icons-details">
                    <button class="card-details__btn __trash" onclick="borrarGifFav('${id}')"></button>
                    <button class="card-details__btn __dwld" onclick="descargarGif('${urlImg}', '${slug}')"></button>
                    <button class="card-details__btn __expand" onclick="expandGif('${urlImg}', '${title}', '${user}', '${slug}', '${id}')"></button>
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

//  =========        RENDER MISGIFS
function renderMisGifs() {
    misGifsArr = JSON.parse(localStorage.getItem('misGifos'))
    MISGIFS_CONT.innerHTML = ''
    console.log(misGifsArr)
    if (misGifsArr == null) { 
        MISGIFS_CONT.innerHTML = `
        <div class="fav-sin-contenido">
        <img src="../assets/icon-mis-gifos-sin-contenido.svg" alt="sin contenido">
        <p>¡Anímate a crear tu propio contenido!</p>
        </div>
        `
    } else {
        for(let i = 0; i < misGifsArr.length; i++) {
            let id = misGifsArr[i]
            let image = `https://media.giphy.com/media/${id}/giphy.gif`
            MISGIFS_CONT.innerHTML += `<div class="gif-cont" onclick="expandGifMob('${image}', 'Mi GIF ${i+1}, 'GIFOS', '${id}', '${id}')">
            <div class="card-details">
                <div class="icons-details">
                    <button class="card-details__btn __trash" onclick="borrarGifMG('${id}')"></button>
                    <button class="card-details__btn __dwld" onclick="descargarGif('${image}', '${id}')"></button>
                    <button class="card-details__btn __expand" onclick="expandGif('${image}', 'Mi gif ${i+1}', 'Gifos', '${id}', '${id}')"></button>
                </div>
                <div class="card-details__text">
                    <p>GiFOS</p>
                    <h5>Mi Gif ${i+1}</h5>
                </div>
            </div>
            <img src="${image}" alt="Mi gif${i+1}" class="img-gif">
            </div>`
        }
    } 
}

// ················        FUNCIONES EXPANDIR GIFS     ···················
function expandGif(url, title, user, slug, id) {
    console.log('expand')
    EXPAND_OVERLAY.style.visibility = "visible"
    EXPAND_GIF.setAttribute('src', `${url}`)
    EXPAND_TEXT.innerHTML = `
    <p>${user}</p>
    <h3>${title}</h3>
    `
    EXPAND_BTNS.innerHTML = `
        <button id="favExpnd" onclick="agregarFavorito('${id}', '${url}', '${title}', '${user}', '${slug}')" id="icon-fav-${id}"></button>
        <button id="dwldExpnd" onclick="descargarGif('${url}', '${slug}')"></button>
    `
}
// ====== MOBIL

function expandGifMob(url, title, user, slug, id) {
    if (window.matchMedia("(max-width:749px)").matches) {
        EXPAND_OVERLAY.style.visibility = "visible"
        EXPAND_GIF.setAttribute('src', `${url}`)
        EXPAND_TEXT.innerHTML = `
        <p>${user}</p>
        <h3>${title}</h3>
        `
        EXPAND_BTNS.innerHTML = `
            <button id="favExpnd" onclick="agregarFavorito('${id}', '${url}', '${title}', '${user}', '${slug}')" id="icon-fav-${id}"></button>
            <button id="dwldExpnd" onclick="descargarGif('${url}', '${slug}')"></button>
        `
    }
    
}


// ··· Cerrar ventana EXPAND
function closeExpand() {
    EXPAND_OVERLAY.style.visibility = "hidden"
}
// ·············································
// ······       FUNCION BORRAR GIFS 
function borrarGifFav(gifId) {
    let arrBorrar = []
    arrBorrar = JSON.parse(localStorage.getItem('favorites'))
    let indx = arrBorrar.findIndex(function (post){
        if (post.id == gifId){
            return true
        }
    })
    arrBorrar.splice(indx, 1);
    let newFavString = JSON.stringify(arrBorrar)
    localStorage.setItem('favorites', newFavString)
    renderFavs()

}
// ···· BORRAR MISGIFS
function borrarGifMG(gifId) {
    let arrBorrar = []
    arrBorrar = JSON.parse(localStorage.getItem('misGifos'))
    let indx = arrBorrar.indexOf(gifId)
    
    arrBorrar.splice(indx, 1);
    let newFavString = JSON.stringify(arrBorrar)
    localStorage.setItem('misGifos', newFavString)
    renderMisGifs()

}