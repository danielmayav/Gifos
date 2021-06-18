// ======   TRENDING

const trendingResult = document.querySelector('#trending-slider');
const TOPICS = document.getElementById('topics-trend')
const PREV_BTN = document.getElementById('prev-gif')
const NEXT_BTN = document.getElementById('next-gif')
const TREND_SLIDER = document.getElementById('trending-slider')
// ········· TRENDING TAGS
window.onload = topicsTags();
 function topicsTags() {
     let url = `https://api.giphy.com/v1/trending/searches?api_key=${apiKey}`;
     return fetch(url)
     .then(res=>res.json())
     .then(cont => {
        let tags = cont.data;
        TOPICS.innerHTML=`
        <span class="tags-link">${tags[0]}, </span>
        <span class="tags-link">${tags[1]}, </span>
        <span class="tags-link">${tags[2]}, </span>
        <span class="tags-link">${tags[3]}, </span>
        <span class="tags-link">${tags[4]}.</span>
        `
        let tagBtn = document.querySelectorAll('.tags-link')
        for (let a = 0; a < tagBtn.length; a++) {
            tagBtn[a].addEventListener('click', function(){
                searchBar.value = tags[a]
                search(tags[a])
            })
        }
     })
     .catch(err => console.log(err))
 }

// ········     To render Trends into html
async function trend () {
    const trendPath = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=12`
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
            <div class="gif-cont" onclick="maxGifMobile('${urlImg}', '${id}', '${slug}', '${user}', '${title}')">
                <div class="card-details">
                    <div class="icons-details">
                    <button class="card-details__btn __fav" onclick="agregarFavorito('${id}', '${urlImg}', '${title}', '${user}', '${slug}' )" id="icon-fav-${id}"></button>
                    <button class="card-details__btn __dwld" onclick="descargarGif('${urlImg}', '${slug}')"></button>
                    <button class="card-details__btn __expand" onclick="expandGif('${urlImg}', '${title}', '${user}')"></button>
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

const nextSlider = () => {
    TREND_SLIDER.scrollLeft +=400;
}
NEXT_BTN.addEventListener('click', nextSlider);

const prevSlider = () => {
    TREND_SLIDER.scrollLeft -=400;
}
PREV_BTN.addEventListener('click', prevSlider)
