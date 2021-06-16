window.onload = renderFavs();
function renderFavs () {
    
    favoritosArr = JSON.parse(localStorage.getItem('favorites'))

    if (favoritosArr == null) {
        favoritosArr = []
    } else {
        for(let i = 0; i < favoritosArr.length; i++) {
            FAV_CONT.innerHTML += `<div class="gif-cont" onclick="maxGifMobile('${urlImg}', '${id}', '${slug}', '${user}', '${title}')")>
            <div class="card-details">
                <div class="icons-details">
                    <button class="card-details__btn __fav" onclick="agregarFavorito('${id}', '${urlImg}', '${title}', '${user}' )" id="icon-fav-${id}"></button>
                    <button class="card-details__btn __dwld" onclick="descargarGif('${urlImg}', '${slug}')"></button>
                    <button class="card-details__btn __expand" onclick="maxGifDesktop('${urlImg}', '${id}', '${slug}', '${user}', '${title}')"></button>
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