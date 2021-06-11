// ======   TRENDING

const trendingResult = document.querySelector('#trending-slider');

// ········     To render Trends into html
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
            let urlImg = obj.images.downsized.url
            let id = obj.id
            let slug = obj.slug
            trendRender +=  // TODO: check id's and classes <=====
            `
            <div class="gif-cont" onclick="maxGifMobileTrending('${urlImg}', '${id}', '${slug}', '${user}', '${title}')">
                <div class="card-details">
                    <div class="icons-details">
                        <button class="card-details__btn __fav" onclick="agregarFavoritoTrending('${id}')" id="icon-fav-trending-${id}"></button>
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
        })
        
        trendingResult.innerHTML = trendRender;
    }) .catch (function(err){
        console.log(err.message);
    })
}
trend()

// ········         SLIDER      ······················ TODO: check id's and clases <========

let imageIndex = 1;
let translateX = 0;

let trendingBtnNext = document.getElementById('next-gif');
let trendingBtnPrev = document.getElementById('prev-gif');

trendingBtnNext.addEventListener('click', sliderNext);
function sliderNext() {
    if (window.matchMedia("(min-width: 1440px)").matches) {
        if (imageIndex <= 5) {
            imageIndex++;
            translateX -= 387;
            sliderTrendingGifos.style.transform = `translateX(${translateX}px)`;
        }
    } else if (window.matchMedia("(min-width: 1024px)").matches) {
        if (imageIndex <= 5) {
            imageIndex++;
            translateX -= 273;
            sliderTrendingGifos.style.transform = `translateX(${translateX}px)`;
        }
    }
}

trendingBtnPrev.addEventListener('click', sliderPrev);
function sliderPrev() {
    if (window.matchMedia("(min-width: 1440px)").matches) {
        if (imageIndex !== 1) {
            imageIndex--;
            translateX += 387;
            sliderTrendingGifos.style.transform = `translateX(${translateX}px)`;
        }
    } else if (window.matchMedia("(min-width: 1024px)").matches) {
        if (imageIndex !== 1) {
            imageIndex--;
            translateX += 273;
            sliderTrendingGifos.style.transform = `translateX(${translateX}px)`;
        }
    }
}

modalMobile = document.createElement("div");
modalDesktop = document.createElement("div");

function maxGifMobileTrending(img, id, slug, user, title) {
    if (window.matchMedia("(max-width: 1023px)").matches) {
        modalMobile.style.display = "block";
        modalMobile.innerHTML = `
    <button class="modal-btn-close" onclick="cerrarModalMobile()"><img src="/assets/button-close.svg" alt=""></button>
    <img src="${img}" alt="${id}" class="modal-gif">

    <div class="modal-bar">
        <div class="modal-textos">
            <p class="modal-user">${user}</p>
            <p class="modal-titulo">${title}</p>
        </div>
        <div>
            <button class="modal-btn" onclick="agregarFavoritoMaxMobileTrending('${id}')"><img src="/assets/icon-fav-hover.svg" alt="fav-gif" id="icon-fav-max-mob-trending-${id}"></button>
            <button class="modal-btn" onclick="descargarGifTrending('${img}', '${slug}')"><img src="/assets/icon-download.svg" alt="download-gif"></button>
        </div>
    </div>
    `;
        modalMobile.classList.add("modal-activado");
        document.body.appendChild(modalMobile);
    }
}

function cerrarModalMobile() {
    modalMobile.style.display = "none";
}

function agregarFavoritoMaxMobileTrending(gif) {

    let iconFavMaxMobile = document.getElementById('icon-fav-max-mob-trending-' + gif);
    iconFavMaxMobile.setAttribute("src", "/assets/icon-fav-active.svg");

    agregarFavoritoTrendingGral(gif);
}

function maxGifDesktopTrending(img, id, slug, user, title) {
    if (window.matchMedia("(min-width: 1023px)").matches) {
        modalDesktop.style.display = "block";
        modalDesktop.innerHTML = `
    <button class="modal-btn-close" onclick="cerrarModalDesktop()"><img src="/assets/button-close.svg" alt=""></button>
    <img src="${img}" alt="${id}" class="modal-gif">

    <div class="modal-bar">
        <div class="modal-textos">
            <p class="modal-user">${user}</p>
            <p class="modal-titulo">${title}</p>
        </div>
        <div>
            <button class="modal-btn" onclick="agregarFavoritoMax('${id}')"><img src="/assets/icon-fav-hover.svg" alt="fav-gif" id="icon-fav-max-${id}"></button>
            <button class="modal-btn" onclick="descargarGif('${img}', '${slug}')"><img src="/assets/icon-download.svg" alt="download-gif"></button>
        </div>
    </div>
    `;
        modalDesktop.classList.add("modal-activado");
        document.body.appendChild(modalDesktop);
    }
}

function cerrarModalDesktop() {
    modalDesktop.style.display = "none";
}

function agregarFavoritoMax(gif) {
    let iconFavMax = document.getElementById('icon-fav-max-' + gif);
    iconFavMax.setAttribute("src", "/assets/icon-fav-active.svg");
    agregarFavoritoTrendingGral(gif);
}

// FAVORITOS
favoritosArray = [];
favoritosString = localStorage.getItem("gifosFavoritos");

function agregarFavoritoTrending(gif) {
    //cambio el icono del corazon
    let iconFav = document.getElementById('icon-fav-trending-' + gif);
    iconFav.setAttribute("src", "/assets/icon-fav-active.svg");

    agregarFavoritoTrendingGral(gif);

}

function agregarFavoritoTrendingGral(gif) {
    //si en el local storage no hay nada, el array queda vacio
    if (favoritosString == null) {
        favoritosArray = [];

    } else {
        //si tengo contenido, necesito parsearlo para poder agregar uno nuevo independiente
        favoritosArray = JSON.parse(favoritosString);
    }

    favoritosArray.push(gif);
    //vuelvo a pasar a texto el array para subirlo al localStorage
    favoritosString = JSON.stringify(favoritosArray);
    localStorage.setItem("gifosFavoritos", favoritosString);
   
}


//DESCARGAR
async function descargarGifTrending(gifImg, gifNombre) {
    let blob = await fetch(gifImg).then(img => img.blob());
    invokeSaveAsDialog(blob, gifNombre + ".gif");
}
 