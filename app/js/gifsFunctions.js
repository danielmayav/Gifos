const FAV_CONT = document.getElementById('favoritesRender')

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

function agregarFavorito(id, url, title, user) {
    let objectGif = {
        id: id,
        url: url,
        title: title,
        user: user,
    }
    favoritosArr.push(objectGif);
    localStorage.setItem('favorites', JSON.stringify(favoritosArr));
    let btnFav = document.getElementById(`icon-fav-${id}`)
    btnFav.style.backgroundImage = "var(--btn-fav-act)"
    
}
